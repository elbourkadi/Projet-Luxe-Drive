import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { AgenceService } from 'src/app/services/agence.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-ajouter-agence',
  templateUrl: './ajouter-agence.component.html',
  styleUrls: ['./ajouter-agence.component.css']
})
export class AjouterAgenceComponent {
  Page_Titre="Gestion des Agences"
  form_Titre="Ajouter une agence"

  Managers:any

  getManagers(){
    this.AuthService.getAllUsers().subscribe(
      (data :any[]) => {
        this.Managers = data.filter((item: any) => this.checkRole(item, "Manager"));
        console.log(this.Managers)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  checkRole(user: any, roleToCheck: string): boolean {
    return user && user.role && user.role.toLowerCase() === roleToCheck.toLowerCase();
  }

  ajouterAgence: FormGroup;

  constructor(private formBuilder: FormBuilder,private AgenceService: AgenceService,private route: ActivatedRoute,private router: Router,private AuthService:AuthService) {
    this.ajouterAgence = this.formBuilder.group({
      nom_agence: ['', Validators.required],
      manager: ['', Validators.required],
      email_agence: ['', [Validators.required, Validators.email]],
      telephone_agence: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3})?\d{9,10}$/)]],
      localisation: this.formBuilder.group({
        ville: ['', Validators.required],
        adresse: ['', Validators.required]
      }),
    });
  }
  initializeFormValues() {
    if (this.responseData) {
      this.ajouterAgence.patchValue({
        nom_agence:this.responseData.nom_agence || '',
        manager:this.responseData.manager || '',
        email_agence:this.responseData.email_agence || '',
        telephone_agence:this.responseData.telephone_agence || '',
        localisation: {
          ville: this.responseData.localisation?.ville || '',
          adresse: this.responseData.localisation?.adresse || '',
        },

      });
    }
  }
  id: number | null=null;
  ngOnInit() {
    this.getManagers()
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id !== undefined && id !== null && id !== '') {
        this.form_Titre = "Modifier Agence";
        this.id = id.toString();
        this.fetchDataById(id);
      }
    });
  }
  responseData: any;
  fetchDataById(id: number): void {
    this.AgenceService.getAgence(id).subscribe(
      (data) => {
        this.responseData = data;
        this.initializeFormValues()
        
      },
      (error) => {
        console.error('Error fetching data:', error);
      
      }
    );
    
   }

  formSubmitted = false;
  onSubmit() {
    console.log("jdjdhrfhrfr")
   console.log(this.ajouterAgence.valid)
    if(this.ajouterAgence.valid){
     
      this.AgenceService.AddAgence(this.ajouterAgence.value).subscribe(
      (response:any) => {
          window.location.reload();
          setTimeout(() => {
            alert('Agence ajoutée avec succès');
          }, 100);
          this.router.navigateByUrl('/agences');  
      },
      (error:any) => {
        console.error(error)
      }
    );
    this.formSubmitted=true 
    }
    this.formSubmitted=true 
  }

  onSubmitNotEmpty(){
    
    this.formSubmitted=true 
    if(this.id){
      if(this.ajouterAgence.valid){
      this.AgenceService.updateAgence(this.id ,this.ajouterAgence.value).subscribe(
      (response:any) => {    
        console.log(response)    
          this.router.navigateByUrl('/agences');  
      },
      (error:any) => {
        console.error(error)
      }
      
      
    );         
      }

  
    }

  }

  //Font Awesome icons
  email = faEnvelope;
  tele = faPhone;
  adresse = faMapMarkerAlt;
}