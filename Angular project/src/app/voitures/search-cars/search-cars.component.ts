import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-cars',
  templateUrl: './search-cars.component.html',
  styleUrls: ['./search-cars.component.css']
})
export class SearchCarsComponent implements OnInit {
  searchForm!: FormGroup;
  Agences = [
    'Agence de Tanger Ville',
    'Agence de Tanger Aéroport',
    'Agence de Casablanca Ville',
    'Agence de Casablanca Aéroport',
    'Agence de Marrakech Ville',
    'Agence de Marrakech Aéroport',
    'Agence de Agadir Ville',
    'Agence de Agadir Aéroport',
    'Agence de Tétouan Ville'
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      lieuDepart: ['', Validators.required],
      dateDepart: ['', Validators.required],
      lieuRetour: ['', Validators.required],
      dateRetour: ['', Validators.required]
    });
  }

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', this.searchForm.value);
  }
}
