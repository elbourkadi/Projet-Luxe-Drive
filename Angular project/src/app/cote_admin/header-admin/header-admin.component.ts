import { Component ,Input } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { CommunicationService } from 'src/app/communication.service';
import { LogoutService } from '../logout.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  @Input() Titre: any;

  isLoggedIn = false;
  showDropdown = false;
  receivedDataa: string="";
  name:string=""
  helper = new JwtHelperService();
  nom:string=""
  prenom:string=""
  haveImage:boolean=false

  profil = faUserCircle

  receiveData(data: boolean) {
    this.isLoggedIn = data;
  }

  ngOnInit(){
    this.communicationService.submitEvent$.subscribe(() => {
      const token = localStorage.getItem('token');
      if(!!token){
        this.isLoggedIn=true
        const decodetoken= this.helper.decodeToken(token);
        this.name=decodetoken.prenom +" "+ decodetoken.nom
        this.nom=decodetoken.nom
        this.prenom= decodetoken.prenom
        this.fetchDataById(decodetoken.id)
      }
      
    });
    const token = localStorage.getItem('token'); // Replace 'token' with the key you use to store the token
    if(!!token){
      this.isLoggedIn=true
      const decodetoken= this.helper.decodeToken(token);
      this.name=decodetoken.prenom +" "+ decodetoken.nom
      this.nom=decodetoken.nom
      this.prenom= decodetoken.prenom
      
    }
  }
  responseData:any=""
  fetchDataById(id: number): void {
    this.AuthService.getDataById(id).subscribe(
      (data) => {
        this.responseData = data; 
        this.name=this.responseData.prenom +" "+this.responseData.nom
        this.nom=this.responseData.nom
        this.prenom=this.responseData.prenom

      },
      (error) => {
        console.error('Error fetching data:', error);
        this.responseData = {ERROR:""}; // Set formData as empty in case of an error
      
      }
    );
    console.log(this.responseData)
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  constructor(private logoutService: LogoutService, private communicationService: CommunicationService, private AuthService:AuthService, private router:Router) {}

  logout(): void{
    this.logoutService.deleteTokenFromLocalStorage();
    window.location.href = '/accueil';
  }

  changeProfile() {
    const token = localStorage.getItem('token'); 
    if(!token){
      return 
    }
    const decodetoken= this.helper.decodeToken(token);
    if(decodetoken.id){
      this.router.navigate(['/profil-admin',decodetoken.id ]);
    }

    if(this.helper.isTokenExpired(token)){
      return false;
    }
    return false;
  }
}