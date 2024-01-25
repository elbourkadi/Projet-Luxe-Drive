import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from '../../../client.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/auth.service';
import { VoitureService } from 'src/app/services/voiture.service';
import { AgenceService } from 'src/app/services/agence.service';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  Page_Titre="Gestion des Réservations"
  selectedStatus: string = 'En Aattente'; 
  statuses: string[] = ['En Aattente', 'En cours', 'Completee']; 


  agences:any
  getAgence (){
    this.AgenceService.getAllAgence().subscribe(AgenceData => {
        this.agences=AgenceData
        console.log(this.agences)
      });
  }

  onStatusChange(element:any){
    console.log(element)

  }

  constructor(private AuthService: AuthService,private ReservationService:ReservationService,private VoitureService:VoitureService, private AgenceService:AgenceService) { }
  responseData: any[]=[];
  getData() {
    this.ReservationService.getAllreservation().subscribe(
      (data) => {
        this.responseData = data ;
        console.log(data)      
        this.responseData = this.responseData.filter((reservation) => reservation.status === 'confirmée') .map((element, index) => ({ ...element, sequentialNumber: index + 1 ,id: element.id.toString() }));
        
        this.responseData.forEach(element => {
            element.prix = element.prix_Total;

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
  
        this.filteredData = [...this.responseData];
        this.dataSource.data=this.filteredData as PeriodicElement[];
      },
      (error) => {
        console.error(error);
      }
    );
  }
  //Rechercher
  inputValue: string = ''
  Search() {
    if (this.inputValue === '') {
      this.dataSource.data = this.responseData; 
      this.dataSource.data = this.responseData.filter(cli => this.checkProperties(cli, this.inputValue));
    }
  }
  checkProperties(object: any, input: string): boolean {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if (object[key] && object[key].toString().toLowerCase().includes(input.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

  //Filtrer les résultats
  selectedValue: string = ''; 
  filteredData: any[] = [];
  onSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
    this.applyFilter();
  }
  applyFilter() {
    if (this.selectedValue === '') {
      this.dataSource.data = this.responseData as PeriodicElement[]; // Reset to original data if select value is empty
    } else {
      this.dataSource.data = this.responseData.filter(item => this.checkProperties(item, this.selectedValue)) as PeriodicElement[];
    }
  }

  //Trier
  @ViewChild(MatSort) sort!: MatSort;

  //Afficher les colonnes
  displayedColumns: string[] = ['id', 'client', 'tele', 'voiture','depart','retour','prix','status'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  //Pagination 
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.getData();  
    this.getAgence()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onInputChange() {
    this.Search();
  }
}
 
export interface PeriodicElement {
  id:string;
  client: string;
  tele: string;
  voiture:string;
  depart:string;
  retour:string;
  prix:string;
  status:string
}