import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { MatPaginator,MatPaginatorIntl , MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faArrowLeft, faBookmark, faCheckSquare, faSort, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { InboxService } from 'src/app/services/inbox.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements AfterViewInit{
  Page_Titre="Boîte de réception"

  message: any;
  idMessage: any;
  content: any;

  Va:boolean=false

  cocher = faCheckSquare;
  supprimer = faTrashAlt;
  trier = faSort;
  retour = faArrowLeft;
  important = faBookmark;

  constructor(private InboxService:InboxService) {}
  
  responseData: any[]=[];

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
  displayedColumns: string[] = ['checkbox', 'objet', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  // Pagination 
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  ngOnInit() {
    this.getMessages();
    this.getMessage();


  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  onInputChange() {
    this.Search();
  }

  getMessages() {
    this.InboxService.getMessages().subscribe(
      (data) => {
        console.log(data)
        this.responseData = data ;
        this.filteredData = [...this.responseData];
        this.dataSource.data=this.filteredData as PeriodicElement[];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getMessage() {
    this.InboxService.getMessageById(this.idMessage).subscribe(
      (data) => {
        this.content = data
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  displayContent(id: any){
    this.idMessage = id
    this.getMessage();
    
    this.Va = !this.Va
  }

  goBack(){
    this.Va = !this.Va
  }

  deleteMessage(id: any){
    this.idMessage = id
    this.InboxService.deleteMessage(this.idMessage).subscribe(
      (data) => {
        console.log('Message supprimé avec succès:', data)
      },
      (error) => {
        console.error(error);
      }
    );
    this.Va = !this.Va
  }

  markAsImportant(id: any){
    this.idMessage = id
    this.InboxService.markAsImportant(this.idMessage).subscribe(
      (data) => {
        console.log('Message marqué comme important:', data)
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

export interface PeriodicElement {
  checkbox: boolean;
  objet: string;
  date: string;
}
