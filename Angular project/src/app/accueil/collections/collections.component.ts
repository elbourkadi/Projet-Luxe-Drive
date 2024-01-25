import { Component } from '@angular/core';
import { VoitureService } from 'src/app/services/voiture.service';
@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent {

  constructor(private VoitureService:VoitureService) {}
  responseData: any;

  getVoituresData() {
    this.VoitureService.getAllAVoiture().subscribe(
      (data) => {    
        this.responseData = data ;
        this.loadMoreCars();
      },
      (error) => {
        console.error(error);
        console.log("Hello word")
      }
    );
  }
 
  displayedCars: any[] = [];
  batchSize: number = 6;
  lastIndex: number = 0;
  loadMoreCars() {
    const nextIndex = this.lastIndex + this.batchSize;
    if (nextIndex <= this.responseData.length) {
      this.displayedCars = this.displayedCars.concat(this.responseData.slice(this.lastIndex, nextIndex));
      this.lastIndex = nextIndex;
    }
  }

  ngOnInit() {
    this.getVoituresData()
  }
  Cars:Array<any>=[
    {img:"Audi A8 L 2022" , Name:"Audi A8 L 2022" , price:75.90 , speedometer:"4,00", manual_gearbox:"Auto",users:"4 personne",gas_station:"Electrique",},
    {img:"Nissan Maxima Platinum" , Name:"Nissan Maxima Platinum 2022" , price:75.90 , speedometer:"4,00", manual_gearbox:"Auto",users:"4 personne",gas_station:"Electrique",},
    {img:"Porsche Cayenne GTS 2022" , Name:"Porsche Cayenne GTS 2022" , price:75.90 , speedometer:"4,00", manual_gearbox:"Auto",users:"4 personne",gas_station:"Electrique",},
    {img:"BMW M8 Coupe 2022" , Name:"BMW M8 Coupe 2022" , price:75.90 , speedometer:"4,00", manual_gearbox:"Auto",users:"4 personne",gas_station:"Electrique",},
    {img:"BMW X7 M50i 2022" , Name:"BMW X7 M50i 2022" , price:75.90 , speedometer:"4,00", manual_gearbox:"Auto",users:"4 personne",gas_station:"Electrique",},
    {img:"Porsche Cayenne GTS 2023" , Name:"Porsche Cayenne GTS 2023" , price:75.90 , speedometer:"4,00", manual_gearbox:"Auto",users:"4 personne",gas_station:"Electrique",}

  ]
  Collections = ['Populaire', 'Luxe', 'Sportive', 'Familiale', 'Tout-Terrain'];
}