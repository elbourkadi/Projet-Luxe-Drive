import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HistoriqueService } from 'src/app/services/historique.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { VoitureService } from 'src/app/services/voiture.service';
import { AgenceService } from 'src/app/services/agence.service';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
  constructor(private HistoriqueService:HistoriqueService,private VoitureService:VoitureService, private AgenceService:AgenceService){}
  responseData: any[]=[];
  helper = new JwtHelperService();
  // Rechercher
  inputValue: string = '';
  Search() {
    if (this.inputValue === '') {
      this.dataSource.data = this.responseData;
    } else {
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

  // Filtrer les résultats
  selectedValue: string = '';
  filteredData: any[] = [];

  // Trier
  @ViewChild(MatSort) sort!: MatSort;

  // Afficher les colonnes
  displayedColumns: string[] = ['id', 'voiture', 'depart', 'retour', 'prix', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.responseData);

  // Pagination 
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getIdUser()
    this.loadData()
  }
  iduser:any
  getIdUser(){
    const token = localStorage.getItem('token'); 
    if(token){
      
   
    const decodetoken= this.helper.decodeToken(token);
    this.iduser=decodetoken.id
    }
  }
  loadData(): void {
    this.HistoriqueService.getReservationsClient(this.iduser).subscribe(
      (data) => {
        console.log(data)
        this.responseData = data ;
        this.responseData = this.responseData.map((element, index) => ({ ...element, sequentialNumber: index + 1 ,id: element.id.toString() }));

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
  onInputChange() {
    this.Search();
  }
  
  // code pour pagination
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  modifier = faPencil;
  supprimer = faTrash;
}

export interface PeriodicElement {
  id: string;
  voiture: string;
  depart: string;
  retour: string;
  prix: string;
  status: string;
}
