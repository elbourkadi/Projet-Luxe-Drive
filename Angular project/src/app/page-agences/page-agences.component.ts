import { Component} from '@angular/core';

@Component({
  selector: 'app-page-agences',
  templateUrl: './page-agences.component.html',
  styleUrls: ['./page-agences.component.css']
})
export class PageAgencesComponent {
  showDetailsLeft: boolean = false;
  showDetailsCenter: boolean = false;
  showDetailsRight: boolean = false;

  showDetailsLeft2: boolean = false;
  showDetailsCenter2: boolean = false;
  showDetailsRight2: boolean = false;

  showDetailsLeft3: boolean = false;
  showDetailsCenter3: boolean = false;
  showDetailsRight3: boolean = false;

  showAlternateImage: boolean = false;
  
  toggleDetailsLeft() {
      this.showAlternateImage = !this.showAlternateImage;
      const imgElement = document.getElementById('toggleImgLeft') as HTMLImageElement;
    
      if (this.showAlternateImage) {
        imgElement.src = 'assets/images/Agences/Group 245.svg';
        imgElement.style.transition = 'transform 0.5s ease-in-out';
        imgElement.style.transform = 'rotate(180deg)';
        this.showDetailsLeft = !this.showDetailsLeft;
      } else {
        imgElement.src = 'assets/images/Agences/button.svg'; // Remettez l'image d'origine
        imgElement.style.transition = 'transform 0.5s ease-in-out';
        imgElement.style.transform = 'rotate(90deg)';
        this.showDetailsLeft = !this.showDetailsLeft;
      }
    
  }

  toggleDetailsCenter() {
    this.showAlternateImage = !this.showAlternateImage;
    const imgElement = document.getElementById('toggleImgCenter') as HTMLImageElement;
    if (this.showAlternateImage) {
      imgElement.src = 'assets/images/Agences/Group 245.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(180deg)';
      this.showDetailsCenter = !this.showDetailsCenter;
    } else {
      imgElement.src = 'assets/images/Agences/button.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(90deg)';
      this.showDetailsCenter = !this.showDetailsCenter;
    }
    
  }

  toggleDetailsRight() {
    this.showAlternateImage = !this.showAlternateImage;
    const imgElement = document.getElementById('toggleImgRight') as HTMLImageElement;
    if (this.showAlternateImage) {
      imgElement.src = 'assets/images/Agences/Group 245.svg';
      imgElement.style.transition = 'transform 0.5s ease-in-out'; 
      imgElement.style.transform = 'rotate(180deg)';
      this.showDetailsRight = !this.showDetailsRight;
    } else {
      imgElement.src = 'assets/images/Agences/button.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(90deg)';
      this.showDetailsRight = !this.showDetailsRight;
    }
    
  }

  toggleDetailsLeft2() {
    this.showAlternateImage = !this.showAlternateImage;
    const imgElement = document.getElementById('toggleImgLeft2') as HTMLImageElement;
    if (this.showAlternateImage) {
      imgElement.src = 'assets/images/Agences/Group 245.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(180deg)';
      this.showDetailsLeft2 = !this.showDetailsLeft2;
    } else {
      imgElement.src = 'assets/images/Agences/button.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(90deg)';
      this.showDetailsLeft2 = !this.showDetailsLeft2;
    }
    
  }

  toggleDetailsCenter2() {
    this.showAlternateImage = !this.showAlternateImage;
    const imgElement = document.getElementById('toggleImgCenter2') as HTMLImageElement;
    if (this.showAlternateImage) {
      imgElement.src = 'assets/images/Agences/Group 245.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(180deg)';
      this.showDetailsCenter2 = !this.showDetailsCenter2;
    } else {
      imgElement.src = 'assets/images/Agences/button.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(90deg)';
      this.showDetailsCenter2 = !this.showDetailsCenter2;
    }
    
  }

  toggleDetailsRight2() {
    this.showAlternateImage = !this.showAlternateImage;
    const imgElement = document.getElementById('toggleImgRight2') as HTMLImageElement;
    if (this.showAlternateImage) {
      imgElement.src = 'assets/images/Agences/Group 245.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(180deg)';
      this.showDetailsRight2 = !this.showDetailsRight2;
    } else {
      imgElement.src = 'assets/images/Agences/button.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(90deg)';
      this.showDetailsRight2 = !this.showDetailsRight2;
    }
    
  }
  toggleDetailsLeft3() {
    this.showAlternateImage = !this.showAlternateImage;
    const imgElement = document.getElementById('toggleImgLeft3') as HTMLImageElement;
    if (this.showAlternateImage) {
      imgElement.src = 'assets/images/Agences/Group 245.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(180deg)';
      this.showDetailsLeft3 = !this.showDetailsLeft3;
    } else {
      imgElement.src = 'assets/images/Agences/button.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(90deg)';
      this.showDetailsLeft3 = !this.showDetailsLeft3;
    }
    
  }

  toggleDetailsCenter3() {
    this.showAlternateImage = !this.showAlternateImage;
    const imgElement = document.getElementById('toggleImgCenter3') as HTMLImageElement;
    if (this.showAlternateImage) {
      imgElement.src = 'assets/images/Agences/Group 245.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(180deg)';
      this.showDetailsCenter3 = !this.showDetailsCenter3;
    } else {
      imgElement.src = 'assets/images/Agences/button.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(90deg)';
      this.showDetailsCenter3 = !this.showDetailsCenter3;
    }
   
  }

  toggleDetailsRight3() {
    this.showAlternateImage = !this.showAlternateImage;
    const imgElement = document.getElementById('toggleImgRight3') as HTMLImageElement;
    if (this.showAlternateImage) {
      imgElement.src = 'assets/images/Agences/Group 245.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(180deg)';
      this.showDetailsRight3 = !this.showDetailsRight3;
    } else {
      imgElement.src = 'assets/images/Agences/button.svg'; 
      imgElement.style.transition = 'transform 0.5s ease-in-out';
      imgElement.style.transform = 'rotate(90deg)';
      this.showDetailsRight3 = !this.showDetailsRight3;
    }
    
  }

}
