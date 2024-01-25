import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { faEnvelope, faEye, faEyeSlash, faKey, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import {ClientService} from '../../../client.service'
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-creer-compte',
  templateUrl: './creer-compte.component.html',
  styleUrls: ['./creer-compte.component.css']
})
export class CreerCompteComponent {
  hasIdParam: boolean=false;
  id: number | null=null;
  responseData: any=null;

  Page_Titre="Gestion des Comptes"
  defaultImage = '../../../../assets/images/profile.jpg';
  currentImage: string = this.defaultImage;
  form_Titre="Créer un compte"

  onAddImage() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();

    fileInput.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.currentImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  onRemoveImage() {
    this.currentImage = this.defaultImage;
  }
  getControlErrors(controlName: string, errorType: string): boolean {
    const control = this.creerCompte.get(controlName);
    return control?.hasError(errorType) || false;
  }

  creerCompte: FormGroup;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private ClientService: ClientService,private authService: AuthService,private router: Router) {
    this.creerCompte = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', []],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3})?\d{9,10}$/)]],
      address: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPwd: ['', [Validators.required, this.matchValues('password')]],
    });

  }


  initializeFormValues() {
    if (this.responseData) {
      this.creerCompte.patchValue({
        nom:this.responseData.nom || '',
        prenom:this.responseData.prenom || '',
        email:this.responseData.email || '',
        address:this.responseData.address || '',
        telephone: this.responseData.telephone || '', 
        role: this.responseData.role || '', 
      });
    }
  }
  matchValues(matchTo: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.root.get(matchTo);
      const confirmPwd = control.value;
      
      if (password && confirmPwd !== password.value) {
        return { mismatch: true };
      }
      return null;
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id !== undefined && id !== null && id !== '') {
        this.form_Titre="Modifier compte"
        this.id = id.toString();
        this.fetchDataById(id);
      }
    });

    
  }
  fetchDataById(id: number): void {
    this.authService.getDataById(id).subscribe(
      (data) => {
        this.responseData = data; // Assign fetched data to formData
        this.initializeFormValues();
        
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.responseData = {ERROR:""}; // Set formData as empty in case of an error
      
      }
    );
    console.log(this.responseData)
  }
  formSubmitted = false;
  compte_deja_exist=false
  onSubmit() {
   
    if(this.creerCompte.valid){
      this.authService.setAuthToken("adnanelhayanijwtadnanelhayanijwtadnanelhayanijwt"); 
      this.authService.registerUser(this.creerCompte.value).subscribe(
      (response:any) => {
        if (response.jwt) {
          const dataToSend = true; 
      

          setTimeout(() => {
            alert('Compte ajoutée avec succès!');
          }, 100);
          this.router.navigate(['/comptes']);
        }
      },
      (error:any) => {
        if(error.jwt="Email is already taken"){
           this.compte_deja_exist=true
        }
      }
    );
    this.formSubmitted=true 
    }
    this.formSubmitted=true 
  }
  onSubmitNotEmpty(){
    const formData = { ...this.creerCompte.value };
    delete formData.password;
    delete formData.confirmPwd;
    if(this.id){
      this.authService.updateUser(this.id ,formData).subscribe(
      (response:any) => {    
          
         
          setTimeout(() => {
            alert('Compte modifier avec succe!');
          }, 100);
      },
      
    ); 
    this.router.navigateByUrl('/comptes');   
    }


    console.log("Hello word ")
    console.log('Form update:', formData);
  
  }

  //Font Awesome icons
  email = faEnvelope;
  tele = faPhone;
  adresse = faMapMarkerAlt;
  password = faKey;
  eyePwd = faEyeSlash;
  eyeConfirmPwd = faEyeSlash;

  hidePassword = true;
  hideConfirmPassword = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.eyePwd = this.hidePassword ? faEyeSlash : faEye;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
    this.eyeConfirmPwd = this.hideConfirmPassword ? faEyeSlash : faEye;
  }
}
