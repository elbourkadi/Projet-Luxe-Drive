# Utiliser l'image de base Python
FROM python:3.11.6

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de l'application Flask
COPY ./Angular project/ .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port 5001 pour l'application Flask
EXPOSE 5001

# Commande pour démarrer l'application Flask
CMD ["python", "app.py"]

