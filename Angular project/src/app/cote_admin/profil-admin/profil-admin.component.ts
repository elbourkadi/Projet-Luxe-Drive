import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faEnvelope, faPhone, faMapMarkerAlt, faKey, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { CommunicationService } from 'src/app/communication.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent {
  Page_Titre = "Profil";
  profilePicture = '../../../../assets/images/users/Frame 85.svg';
  defaultImage = '../../../../assets/images/profile.jpg';
  currentImage: string = this.profilePicture;
  nom:string=""
  prenom:string=""
  hasIdParam: boolean=false;
  id: number | null=null;
  responseData: any={};
  
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
    const control = this.modifierProfil.get(controlName);
    return control?.hasError(errorType) || false;
  }

  modifierProfil: FormGroup;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private AuthService:AuthService,private communicationService: CommunicationService) {
    this.modifierProfil = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ["", [Validators.required, Validators.pattern(/^(\+\d{1,3})?\d{9,10}$/)]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPwd: ['', [Validators.required, this.matchValues('password')]],
    });
  }
  initializeFormValues() {
    if (this.responseData) {
      this.modifierProfil.patchValue({
        nom:this.responseData.nom || '',
        prenom:this.responseData.prenom || '',
        email:this.responseData.email || '',
        address:this.responseData.address || '',
        telephone: this.responseData.telephone || '', 
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
      this.id = id.toString() ;
      
      if (this.id !== null) {
        console.log(this.id)
        this.fetchDataById(this.id);
      console.log("Hello wor d")
      } else {
        this.responseData = null;
        console.log("Hello wor diii")
   
      }
    });
    
  }
  fetchDataById(id: number): void {
    this.AuthService.getDataById(id).subscribe(
      (data: any) => {
        this.responseData = data; 
        this.nom=this.responseData.nom
        this.prenom=this.responseData.prenom
        console.log(this.responseData.value)
        this.initializeFormValues();
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.responseData = {ERROR:""}; // Set formData as empty in case of an error
      
      }
    );
    console.log(this.responseData)
  }
  formSubmitted = false;


  onSubmit() {
    this.formSubmitted=true
  }




  onSubmitNotEmpty() {
    this.formSubmitted=true

  

    if (this.modifierProfil.valid && this.id !== null ) {

      this.updateUser(this.id);
      this.formSubmitted = true;
    }
  }
  updateUser(id: number) {
    const formDataWithoutConfirmPassword = { ...this.modifierProfil.value };
    delete formDataWithoutConfirmPassword.confirmPwd;
    delete formDataWithoutConfirmPassword.password
    
    this.AuthService.updateUser(id, formDataWithoutConfirmPassword).subscribe(
      (response: any) => {
        if (response) { 
          this.formSubmitted=false
          this.modifierProfil.patchValue({
            password:  '', 
            confirmPwd:''
          });  
          console.log(response);
          this.communicationService.triggerSubmitEvent();
        

          // Display an alert after the page reloads
          setTimeout(() => {
            alert('Form submitted successfully!');
          }, 100);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  

  //Font Awesome icons
  email = faEnvelope;
  tele = faPhone;
  adresse = faMapMarkerAlt;
  password = faKey;
  eyePwdActuel = faEyeSlash;
  eyePwd = faEyeSlash;
  eyeConfirmPwd = faEyeSlash;

  hidePasswordActuel = true;
  hidePassword = true;
  hideConfirmPassword = true;

  togglePasswordActuelVisibility(): void {
    this.hidePasswordActuel = !this.hidePasswordActuel;
    this.eyePwdActuel = this.hidePasswordActuel ? faEyeSlash : faEye;
  }
  
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.eyePwd = this.hidePassword ? faEyeSlash : faEye;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
    this.eyeConfirmPwd = this.hideConfirmPassword ? faEyeSlash : faEye;
  }
}