import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from '../../../client.service';
import { faCheckCircle, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthService } from 'src/app/auth.service';
import { VoitureService } from 'src/app/services/voiture.service';
import { AgenceService } from 'src/app/services/agence.service';

@Component({
  selector: 'app-pre-reservations',
  templateUrl: './pre-reservations.component.html',
  styleUrls: ['./pre-reservations.component.css']
})
export class PreReservationsComponent {
  Page_Titre="Gestion des Réservations"

  agences :any

  changeStatus(id:any){
    this.ReservationService.ChangeStatus(id,"Ayoub").subscribe(
      (responseData) => {
       
        this.getData()
      },
      (error) => {
        // Handle error response
        console.error('Error:', error);
  })
}

  getAgence (){
    this.AgenceService.getAllAgence().subscribe(AgenceData => {
        this.agences=AgenceData
       
      });
  }
  constructor(private AuthService: AuthService,private ReservationService:ReservationService,private VoitureService:VoitureService, private AgenceService:AgenceService) { }
  

  responseData: any[]=[];
  getData() {
    this.ReservationService.getAllreservation().subscribe(
      (data) => {
        this.responseData = data ;  
        console.log(data)    
        this.responseData = this.responseData.filter((reservation) => reservation.status === 'Pas encours') .map((element, index) => ({ ...element, sequentialNumber: index + 1 ,id: element.id.toString() }));
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
      this.dataSource.data = this.responseData as PeriodicElement[];
    } else {
      this.dataSource.data = this.responseData.filter(item => this.checkProperties(item, this.selectedValue)) as PeriodicElement[];
    }
  }

  //Trier
  @ViewChild(MatSort) sort!: MatSort;

  //Afficher les colonnes
  displayedColumns: string[] = ['id', 'client', 'tele', 'voiture','depart','retour','prix','actions'];
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

  isConfirmationDialogOpen = false;
  confirmationDialogData: { message: string, id: string } | null = null;
  messageConf=""
  openConfirmationDialog(id:any,name:string,prenom:string): void {
    this.isConfirmationDialogOpen = true;
    this.messageConf="Êtes-vous sûr de vouloir supprimer la reservation de "+name+ " de cette voiture "+prenom+" ?"
    this.confirmationDialogData = {
      message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      id: id
    };
  }
  handleConfirmation(result: boolean, id: string | undefined): void {
    if (result) {
      this.ReservationService.deletereservation(id).subscribe(
        response => {
          console.log('reservation deleted successfully:', response);
          this.getData()
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
      console.log(id);
    } else {
      console.log('User clicked "Non"');
    }
    this.isConfirmationDialogOpen = false;
  }

  confirmer = faCheckCircle
  modifier = faPencil
  supprimer = faTrash
}



 
export interface PeriodicElement {
  id:string;
  client: string;
  tele: string;
  voiture:string;
  depart:string;
  retour:string;
  prix:string;
  actions:string
}