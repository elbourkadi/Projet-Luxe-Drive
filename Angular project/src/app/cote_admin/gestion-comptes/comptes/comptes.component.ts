
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator,MatPaginatorIntl , MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import {ClientService} from '../../../client.service'
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css'],

})

export class ComptesComponent implements AfterViewInit{
  Page_Titre="Gestion des Comptes"

  // constructor 
  constructor(private ClientService: ClientService,private AuthService:AuthService ) { }
  
  // prend data en api (service)
  responseData: any[]=[];
  getData() {
    this.ClientService.getSomeData().subscribe(
      (data) => {
        this.responseData = data ;
        
        this.filteredData = [...this.responseData];
        this.dataSource.data=this.filteredData as PeriodicElement[];
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getUsersData() {
    this.AuthService.getAllUsers().subscribe(
      (data) => {
        console.log(data)
        this.responseData = data ;
        this.responseData = this.responseData.map((element, index) => ({ ...element, sequentialNumber: index + 1 ,id: element.id.toString() }));
        this.filteredData = [...this.responseData];
        this.dataSource.data=this.filteredData as PeriodicElement[];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Recherecher
  inputValue: string = ''
  Search() {
    if (this.inputValue === '') {
      this.dataSource.data = this.responseData; 
    }
    else{
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
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'tele', 'adresse', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  //Pagination 
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.getUsersData()
    console.log(this.dataSource.data[0]?.prenom);
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
    this.messageConf="Êtes-vous sûr de vouloir supprimer "+name+ " "+prenom+" ?"
    this.confirmationDialogData = {
      message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      id: id
    };
  }
  handleConfirmation(result: boolean, id: string | undefined): void {
    if (result) {
      this.AuthService.deleteUser(id).subscribe(
        response => {
          console.log('User deleted successfully:', response);
          this.getUsersData()
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

  modifier = faPencil
  supprimer = faTrash
}
 
export interface PeriodicElement {
  id:string;
  nom: string;
  prenom: string;
  email:string;
  tele:string;
  address:string;
  actions:string
}