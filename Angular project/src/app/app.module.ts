import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchCarsComponent } from './voitures/search-cars/search-cars.component';
import { CartCarComponent } from './voitures/cart-car/cart-car.component';
import { CommentFonctionneComponent } from './accueil/comment-fonctionne/comment-fonctionne.component';
import { NosServicesComponent } from './accueil/nos-services/nos-services.component';
import { CommentaireComponent } from './accueil/commentaire/commentaire.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PageAgencesComponent } from './page-agences/page-agences.component';
import { PageReservationComponent } from './page-reservation/page-reservation.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { MarquesComponent } from './accueil/marques/marques.component';
import { HeroSectionComponent } from './accueil/hero-section/hero-section.component';
import { CollectionsComponent } from './accueil/collections/collections.component';
import { ContactComponent } from './contact/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageContactComponent } from './page-contact/page-contact.component';
import { SharedModule } from './shared/shared.module';
import { MenuComponent } from './cote_admin/menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './cote_admin/dashboard/dashboard.component';
import { CreerCompteComponent } from './cote_admin/gestion-comptes/creer-compte/creer-compte.component';
import { HeaderAdminComponent } from './cote_admin/header-admin/header-admin.component';
import { ComptesComponent } from './cote_admin/gestion-comptes/comptes/comptes.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { CustomPaginatorIntl } from './cote_admin/gestion-comptes/comptes/custom-paginator-intl'; // Path to custom paginator service
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PreReservationsComponent } from './cote_admin/gestion-reservations/pre-reservations/pre-reservations.component';
import { ReservationsComponent } from './cote_admin/gestion-reservations/reservations/reservations.component';
import { AgencesComponent } from './cote_admin/gestion-agences/agences/agences.component';
import { AjouterAgenceComponent } from './cote_admin/gestion-agences/ajouter-agence/ajouter-agence.component';
import { InboxComponent } from './cote_admin/inbox/inbox.component';
import { VoituresComponent } from './cote_admin/gestion-voitures/voitures/voitures.component';
import { AjouterVoitureComponent } from './cote_admin/gestion-voitures/ajouter-voiture/ajouter-voiture.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmerReservationComponent } from './voitures/confirmer-reservation/confirmer-reservation.component';
import { DatePipe } from '@angular/common';
import { ProfilAdminComponent } from './cote_admin/profil-admin/profil-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCarsComponent,
    CartCarComponent,
    CommentFonctionneComponent,
    NosServicesComponent,
    CommentaireComponent,
    FooterComponent,
    PageAgencesComponent,
    PageReservationComponent,
    PageHomeComponent,
    MarquesComponent,
    HeroSectionComponent,
    CollectionsComponent,
    ContactComponent,
    PageContactComponent,
    MenuComponent,
    DashboardComponent,
    CreerCompteComponent,
    HeaderAdminComponent,
    ComptesComponent,
    PreReservationsComponent,
    ReservationsComponent,
    AgencesComponent,
    AjouterAgenceComponent,
    InboxComponent,
    VoituresComponent,
    AjouterVoitureComponent,
    ConfirmationDialogComponent,
    ConfirmerReservationComponent,
    ProfilAdminComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
  ],

  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    DatePipe
  ],  

  bootstrap: [AppComponent]
})
export class AppModule { }