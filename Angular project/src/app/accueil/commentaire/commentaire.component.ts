import { Component } from '@angular/core';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent {
  feedbackList = [
    {
      text: "J'ai été vraiment impressionné par le niveau de service que j'ai reçu de cette société de location de voitures. Le processus était fluide et facile, et la voiture que j'ai louée était en excellent état. Le personnel était sympathique et serviable, et je me suis senti bien pris en charge tout au long de ma période de location. Je recommanderais certainement Luxe Drive à quiconque recherche une expérience de location de voiture haut de gamme.",
      auteur: "Mohammed Idrissi",
      location: "Agence de Tanger Ville",
      image: "client1"
    },
    {
      text: "Nous avons loué une voiture pendant 5 jours en septembre. Aucun problème, le gestionnaire était très amical et de confiance, et nous avons obtenu une voiture meilleure que celle prévue initialement. Aucune plainte !!",
      auteur: "Fatima Bennani",
      location: "Agence de Casablanca Ville",
      image: "client2"
    },
    {
      text: "Super agence de location de voitures. Location d'un Audi pour 2 jours, rien à redire. Véhicule comme neuf, prix abordable. Le personnel et le propriétaire étaient excellents. Vous pouvez y aller sans hésitation.",
      auteur: "Omar Bakkali",
      location: "Agence de Tanger Ville",
      image: "client3"
    },
    {
      text: "Excellente agence de location. Arrangeante sur les prix et nous a donné une voiture plus belle et plus spacieuse que prévu ! Il y a une bonne communication et pas d'arnaques ! Je ne regrette absolument pas ! Personne de confiance.",
      auteur: "Charlotte Vezzani",
      location: "Agence de Tanger Aéroport",
      image: "client4"
    },
  ];

  currentFeedbackIndex = 0;

  showNextFeedback() {
    this.currentFeedbackIndex = (this.currentFeedbackIndex + 1) % this.feedbackList.length;
  }

  showPreviousFeedback() {
    this.currentFeedbackIndex = (this.currentFeedbackIndex - 1 + this.feedbackList.length) % this.feedbackList.length;
  }
}
