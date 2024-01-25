import { Component } from '@angular/core';
import { faTachometerAlt, faUserCog, faBuilding, faCar, faCalendarAlt, faInbox, faRightFromBracket, faChevronRight, faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons';
import { LogoutService } from '../logout.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  openSubMenus: string[] = [];
  helper = new JwtHelperService();
  
  constructor(private logoutService: LogoutService) {}
  seDeconnecter(): void {
    this.logoutService.deleteTokenFromLocalStorage();
    window.location.href = '/accueil';
  }

  admin:boolean=false
getRole(){
  const token = localStorage.getItem('token'); 
  if(token){
    
  console.log("this is a admin")
  const decodetoken= this.helper.decodeToken(token);
  const userRoles = decodetoken.role
  console.log(userRoles)
if(userRoles=="[admin]"){
  this.admin=true
  
}
} }
  ngOnInit(){
    this.getRole()
  }
  //Font Awesome icons
  dashboard = faTachometerAlt;
  comptes = faUserCog;
  agences = faBuilding;
  voitures = faCar;
  reservations = faCalendarAlt;
  inbox = faInbox;
  logout = faRightFromBracket;
  chevronRight = faChevronRight;
  chevronDown = faChevronDown;
  circle = faCircle;

  toggleSubMenu(subMenu: string): void {
    if (this.openSubMenus.includes(subMenu)) {
      this.openSubMenus = this.openSubMenus.filter(item => item !== subMenu);
    } else {
      this.openSubMenus.push(subMenu);
    }
  }
}
