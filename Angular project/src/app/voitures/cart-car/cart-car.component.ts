import { Component ,Input} from '@angular/core';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-cart-car',
  templateUrl: './cart-car.component.html',
  styleUrls: ['./cart-car.component.css']
})
export class CartCarComponent {

  @Input() Car:any
  voiture : any

  isPopupOpen: boolean = false;
  openPopup(id : any) {
    this.isPopupOpen = true;
    this.voiture = id;
  }

  closePopupins() {
    this.isPopupOpen = false;
  }
  isLoggedIn:boolean=false
  loged(){
    const token = localStorage.getItem('token');
    if(!!token){
      this.isLoggedIn=true
  }
}

ngOnInit(){
  this.loged()
}
}
