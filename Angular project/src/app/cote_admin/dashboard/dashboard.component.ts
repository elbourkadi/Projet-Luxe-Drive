import { Component } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { FlaskService } from 'src/app/services/flask.service';
import { HttpClient,HttpResponse  } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/auth.service';
import { VoitureService } from 'src/app/services/voiture.service';
import { AgenceService } from 'src/app/services/agence.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  Page_Titre="Tableau de bord"
  img:any
  imageUrl: string=""
  user_count=""
  revenue=""
  reservations_count=""
  constructor(private FlaskService:FlaskService,private AuthService: AuthService,private ReservationService:ReservationService,private VoitureService:VoitureService, private AgenceService:AgenceService){}
  responseData: any[]=[];
  getData() {
    this.ReservationService.getAllreservation().subscribe(
      (data) => {
        this.responseData = data ;      
        this.responseData = this.responseData.filter((reservation) => reservation.status === 'confirmée') .map((element, index) => ({ ...element, sequentialNumber: index + 1 ,id: element.id.toString() }));
        
        this.responseData.forEach(element => {
          this.AuthService.getDataById(element.user_id).subscribe(managerDetails => {
            element.user_id = managerDetails.prenom +" "+ managerDetails.nom; 
            element.tele = managerDetails.telephone; 
          });
        });
        this.responseData.forEach(element => {
          this.VoitureService.getVoitureById(element.voiture_id).subscribe(Voituredata => {
            element.voiture=Voituredata.marque+" "+Voituredata.modele
          });
        });
        this.responseData.forEach(element => {
          this.AgenceService.getAgence(element.agence_depart_id).subscribe(AgenceData => {
            element.depart=AgenceData.nom_agence
          });
        });
        this.responseData.forEach(element => {
          this.AgenceService.getAgence(element.agence_retour_id).subscribe(AgenceData => {
            element.retour=AgenceData.nom_agence
          });
        });
console.log(this.responseData)
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getrevenu(){
    this.FlaskService.getrevenue().subscribe(
      (rese)=>{
       this.revenue=rese.total_revenue
      },
      error => {
        console.error('Error fetching user count:', error);
      }
    )}
    getreservation(){
      this.FlaskService.getreservations_count().subscribe(
        (rese)=>{
         this.reservations_count=rese.reservations_count
        },
        error => {
          console.error('Error fetching user count:', error);
        }
      )}
      getUser_count(){
        this.FlaskService.getuser_count().subscribe(
          (rese)=>{
           this.user_count=rese.user_count
          },
          error => {
            console.error('Error fetching user count:', error);
          }
        )}

  ngOnInit(){
    this.getUser_count()
    this.getreservation()
    this.getrevenu()
    console.log(this.user_count , this.revenue, this.reservations_count)
    this.getData()
   
   
}
}