from io import BytesIO
from flask import Flask, render_template, request, Response
import json
from jinja2 import Template
from flask_pymongo import PyMongo
from pymongo import MongoClient
from matplotlib.figure import Figure
from matplotlib.backends.backend_agg import FigureCanvasAgg as VirtualCanvas
import datetime
from flask import jsonify


from flask_cors import CORS





from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
CORS(app)



cluster_uri = "mongodb+srv://elbourkadi:elbourkadi@cluster0.y8nh7j2.mongodb.net/?retryWrites=true&w=majority"
database_name = "luxeDrive"
collection_name_reservations = "reservations"
collection_name_voitures = "voitures"
collection_name_users = "users"


try:
    client = MongoClient(cluster_uri)
    db = client[database_name]
    collection_reservations = db[collection_name_reservations]
    collection_voitures = db[collection_name_voitures]
    collection_users = db[collection_name_users]

    print("Connected to MongoDB Atlas successfully!")

except Exception as e:
    print("Error connecting to MongoDB Atlas:", e)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/chart')
def chart():
    param = json.loads(request.args.get("param"))
    print(param)

    if param["type"] == "bar":
        try:

            data_from_mongo = collection_reservations.aggregate([
                {"$lookup": {
                    "from": "voitures",
                    "localField": "voiture_id",
                    "foreignField": "_id",
                    "as": "voiture"
                }},
                {"$unwind": "$voiture"},
                {"$group": {"_id": "$voiture.marque", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 5}
            ])

            labels = []
            values = []

            for entry in data_from_mongo:
                labels.append(entry["_id"])
                values.append(entry["count"])

            fig = Figure()
            ax1 = fig.subplots(1, 1)

            ax1.bar(
                labels,
                values,
                color='blue',
                edgecolor='black',
                linewidth=1,
                alpha=0.7
            )

            # Axes styling
            ax1.set_xlabel('Marques des voitures', fontsize=12)
            ax1.set_ylabel('Nombre des  Reservations', fontsize=12)
            ax1.set_title('Top 5 des marques de voitures les plus louées', fontsize=14)

            output = BytesIO()
            VirtualCanvas(fig).print_png(output)

            return Response(output.getvalue(), mimetype="image/png")

        except Exception as e:
            print("Error fetching data for bar chart:", e)
            return "Error fetching data for bar chart"

    elif param["type"] == "line":
        current_month = str(datetime.datetime.now().month).zfill(2)
        current_year = str(datetime.datetime.now().year)
        next_month = str((datetime.datetime.now().month % 12) + 1).zfill(2)

        data_from_mongo = db["reservations"].aggregate([
            {"$match": {
                "date_debut": {"$gte": datetime.datetime.strptime(f"{current_year}-{current_month}-01", "%Y-%m-%d"),
                               "$lt": datetime.datetime.strptime(f"{current_year}-{next_month}-01", "%Y-%m-%d")}
            }},
            {"$group": {
                "_id": {"$week": "$date_debut"},  # Group by week
                "total_price": {"$sum": "$Prix_Total"}  # Sum total price
            }},
            {"$sort": {"_id": 1}}
        ])

        labels = []
        values = []

        for entry in data_from_mongo:
            labels.append(f"Semaine {entry['_id']+1}")
            values.append(entry["total_price"])

        fig = Figure()
        ax1 = fig.subplots(1, 1)

        ax1.plot(
            labels,
            values,
            color='green',
            marker='o',
            linestyle='-',
            markersize=8,
            label='Total Price'
        )

        ax1.set_xlabel('', fontsize=12)
        ax1.set_ylabel('Le Prix des  Reservations', fontsize=12)
        ax1.set_title(f'Le revenu de ce mois  {current_month}-{current_year} par semaine', fontsize=14)
        ax1.legend()

    else:
        return "Unsupported chart type"

    output = BytesIO()
    VirtualCanvas(fig).print_png(output)

    return Response(output.getvalue(), mimetype="image/png")




@app.route('/client_chart')
def client_chart():
    desired_status = request.args.get("statuts", "client")

    data_from_mongo = db["users"].aggregate([
        {"$match": {"status": desired_status}},
        {"$group": {"_id": "$status", "count": {"$sum": 1}}}
    ])

    labels = []
    values = []

    for entry in data_from_mongo:
        labels.append(entry["_id"])
        values.append(entry["count"])

    fig = Figure()
    ax1 = fig.subplots(1, 1)

    ax1.bar(
        labels,
        values,
        color='orange',
        edgecolor='black',
        linewidth=1,
        alpha=0.7
    )

    ax1.set_xlabel('', fontsize=12)
    ax1.set_ylabel('', fontsize=12)
    ax1.set_title(f'nombre des utilisateurs avec status "{desired_status}"', fontsize=14)

    output = BytesIO()
    VirtualCanvas(fig).print_png(output)

    return Response(output.getvalue(), mimetype="image/png")

@app.route('/car_status_pie_chart')
def car_status_pie_chart():
    data_from_mongo = db["voitures"].aggregate([
        {"$group": {"_id": "$status", "count": {"$sum": 1}}}
    ])

    labels = []
    values = []

    for entry in data_from_mongo:
        labels.append(entry["_id"])
        values.append(entry["count"])

    fig = Figure()
    ax1 = fig.subplots(1, 1)

    ax1.pie(
        values,
        labels=labels,
        autopct='%1.1f%%',
        startangle=90,
        colors=['lightgreen', 'lightcoral'],
    )

    ax1.set_title('Disponibilité des voitures', fontsize=14)

    output = BytesIO()
    VirtualCanvas(fig).print_png(output)

    return Response(output.getvalue(), mimetype="image/png")
@app.route('/user_count')
def user_count():
    try:
        user_count = db["users"].count_documents({})

        response = {
            'user_count': user_count
        }

        return jsonify(response)

    except Exception as e:
        print("Error fetching user count:", e)
        return "Error fetching user count"

@app.route('/revenue')
def revenue():
    try:
        current_month = datetime.datetime.now().month
        current_year = datetime.datetime.now().year

        start_date = datetime.datetime(current_year, current_month, 1)
        end_date = datetime.datetime(current_year, current_month + 1, 1)

        data_from_mongo = collection_reservations.aggregate([
            {"$match": {"date_debut": {"$gte": start_date, "$lt": end_date}}},
            {"$group": {"_id": None, "total_revenue": {"$sum": {"$ifNull": ["$Prix_Total", 0]}}}}
        ])

        total_revenue = next(data_from_mongo, {"total_revenue": 0})["total_revenue"]

        response = {
            'total_revenue': total_revenue
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/reservations_count')
def reservations_count():
    try:
        current_month = datetime.datetime.now().month
        current_year = datetime.datetime.now().year

        start_date = datetime.datetime(current_year, current_month, 1)
        end_date = datetime.datetime(current_year, current_month + 1, 1)

        reservations_count = collection_reservations.count_documents({
            "date_debut": {"$gte": start_date, "$lt": end_date}
        })

        response = {
            'reservations_count': reservations_count
        }
        return jsonify(response)

    except Exception as e:
        print("Error counting reservations:", e)
        return "<h1>Error counting reservations</h1>"

@app.route('/agence_revenue')
def agence_revenue():
    try:
        param = json.loads(request.args.get("param"))
        if param["type"] == "bar":
            data_from_mongo = collection_reservations.aggregate([
                {"$lookup": {
                    "from": "voitures",
                    "localField": "voiture_id",
                    "foreignField": "_id",
                    "as": "voiture"
                }},
                {"$unwind": "$voiture"},
                {"$group": {"_id": "$agence_depart_id", "total_price": {"$sum": "$Prix_Total"}}},
                {"$sort": {"total_price": -1}},
                {"$limit": 5}
            ])

            labels = []
            values = []

            for entry in data_from_mongo:
                agence_name = entry.get('agence_depart_name', entry['_id'])
                labels.append(agence_name)
                values.append(entry["total_price"])
            labels[0]="Tanger"
            labels[1]="Marrakech"
            labels[2]="Agadir"
            labels[3]="Casablanca"



            fig = Figure()
            ax1 = fig.subplots(1, 1)


            ax1.barh(
                labels,
                values,
                color='orange',
                edgecolor='black',
                linewidth=1,
                alpha=0.7
            )

            ax1.set_xlabel('Agences ', fontsize=12)
            ax1.set_ylabel('', fontsize=12)
            ax1.set_title('Top 5 des agences ayant généré le plus de revenus', fontsize=14)

            output = BytesIO()
            VirtualCanvas(fig).print_png(output)

            return Response(output.getvalue(), mimetype="image/png")

    except Exception as e:
        print("Error fetching data for bar chart:", e)
        return "Error fetching data for bar chart"
@app.route('/last5reservations')
def last5reservations():
    try:
        last_5_reservations_cursor = collection_reservations.find().sort([("_id", -1)]).limit(5)

        if last_5_reservations_cursor.count() > 0:
            last_5_reservations = list(last_5_reservations_cursor)

            result = []
            for reservation in last_5_reservations:
                user_id = reservation.get("user_id")
                voiture_id = reservation.get("voiture_id")

                user = db["users"].find_one({"_id": user_id})
                user_info = {
                    "nom": user.get("nom", ""),
                    "prenom": user.get("prenom", ""),
                    "telephone": user.get("telephone", ""),
                    "email": user.get("email", ""),
                    "status": user.get("status", "")
                }

                voiture = db["voitures"].find_one({"_id": voiture_id})
                voiture_info = {
                    "marque": voiture.get("marque", ""),
                    "modele": voiture.get("modele", ""),
                }

                result.append({
                    "Prix_Total": reservation.get("Prix_Total", 0),
                    "user": user_info,
                    "voiture": voiture_info
                })

            return jsonify(result)

        else:
            return jsonify({"error": "No reservations found"}), 404

    except Exception as e:
        print("Error fetching last 5 reservations:", e)
        return jsonify({"error": "An error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True)
