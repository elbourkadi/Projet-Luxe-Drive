import {AfterViewInit, Component, ViewEncapsulation ,ViewChild} from '@angular/core';
import {MatPaginator,MatPaginatorIntl , MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatSort } from '@angular/material/sort';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.css'],
  encapsulation: ViewEncapsulation.None // Set encapsulation to None
})
export class VoituresComponent {
  Page_Titre="Gestion des Voitures"
constructor(private VoitureService:VoitureService){}
    // Manually created data
    responseData: any[]=[];

    getVoituresData() {
      this.VoitureService.getAllAVoiture().subscribe(
        (data) => {
         
          this.responseData = data ;
        
          this.filteredData = [...this.responseData];
          this.dataSource.data=this.filteredData as PeriodicElement[];
        },
        (error) => {
          console.error(error);
          console.log("Hello word")
        }
      );
    }




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
  displayedColumns: string[] = ['image', 'marque', 'modele', 'info','prix','quantite','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.responseData);

  // Pagination 
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getVoituresData()
  }

  onInputChange() {
    this.Search();
  }

  modifier = faPencil;
  supprimer = faTrash;

  isConfirmationDialogOpen = false;
  confirmationDialogData: { message: string, id: string } | null = null;
  messageConf=""
  openConfirmationDialog(id:any,marque:string,modele:string): void {
    this.isConfirmationDialogOpen = true;
    this.messageConf="Êtes-vous sûr de vouloir supprimer "+marque+ " "+modele+" ?"
    this.confirmationDialogData = {
      message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      id: id
    };
  }
  handleConfirmation(result: boolean, id: string | undefined): void {
    if (result) {
      this.VoitureService.deleteVoiture(id).subscribe(
        response => {
          console.log('User deleted successfully:', response);
          this.getVoituresData()
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
}
export interface PeriodicElement {
  image:string, 
  marque: string, 
  modele:string, 
  capacity:string, 
  quantite: number, 
  boite: string, 
  Portes_Energie:string,
  consommation:string,
  prix:number,
  actions: string;
}