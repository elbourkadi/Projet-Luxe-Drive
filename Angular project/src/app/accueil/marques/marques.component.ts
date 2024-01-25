import { Component } from '@angular/core';

@Component({
  selector: 'app-marques',
  templateUrl: './marques.component.html',
  styleUrls: ['./marques.component.css']
})
export class MarquesComponent {
  mark:Array<string>=[
    "Toyota","Ford","Tesla","Volkswagen","Honda","Nissan","Chevrolet","BMW","Mercedes-Benz"
   ,"Hyundai","Audi","Kia"
  ]

}
