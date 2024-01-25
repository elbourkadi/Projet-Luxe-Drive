import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PopupInscriptionComponent } from './popup-inscription/popup-inscription.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfilComponent } from './components/profil/profil.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { CustomPaginatorIntl } from '../cote_admin/gestion-comptes/comptes/custom-paginator-intl'; // Path to custom paginator service
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    HeaderComponent,
    PopupInscriptionComponent,
    ProfilComponent,
    HistoriqueComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
  ],

  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
  exports:[
    HeaderComponent,

  ]
})
export class SharedModule { }
