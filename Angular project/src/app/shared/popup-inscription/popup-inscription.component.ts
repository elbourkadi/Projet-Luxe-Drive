import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/communication.service';
import { response } from 'express';
@Component({
  selector: 'app-popup-inscription',
  templateUrl: './popup-inscription.component.html',
  styleUrls: ['./popup-inscription.component.css']
})
export class PopupInscriptionComponent {
  @Output() dataEvent = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  formSubmitted = false;
  formSubmitted_connecter = false;
  confirmation:boolean=false
  compte_deja_exist=false;
  erro_de_connecter=false;

  newCompte: FormGroup;
  se_connecter:FormGroup;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,private communicationService: CommunicationService){
    this.newCompte = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3})?\d{9,10}$/)]],
      password: ['',[ Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmePassword: ['', [Validators.required, this.matchValues('password') ]],

    });

    this.se_connecter=this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    });
  };

  matchValues(matchTo: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.root.get(matchTo);
      const confirmPassword = control.value;
      
      if (password && confirmPassword !== password.value) {
        return { mismatch: true };
      }
      return null;
    };
  }

  getControlErrors(formGroup: FormGroup,controlName: string, errorType: string): boolean {
    const control = formGroup.get(controlName);
    return control?.hasError(errorType) || false;
  }
login:boolean=true
  inscrire() {
    if(this.newCompte.valid){
      this.authService.setAuthToken("adnanelhayanijwtadnanelhayanijwtadnanelhayanijwt"); 
      const formDataWithoutConfirmPassword = { ...this.newCompte.value };
      delete formDataWithoutConfirmPassword.confirmePassword;
      this.authService.registerUser(formDataWithoutConfirmPassword).subscribe(
      (response:any) => {
        if (response.jwt) {
          const dataToSend = true; 
          this.Va=false
          this.login=false
          this.confirmation=true
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
  erro_de_validation:boolean=false
  connecter() {
    if (this.se_connecter.valid) {
      this.authService.authenticateUser(this.se_connecter.value).subscribe(
        (response: any) => {
          console.log(response.jwt);
  
          if (response.jwt) {
            const dataToSend = true;
            this.dataEvent.emit(dataToSend);
            localStorage.setItem('token', response.jwt);
            this.communicationService.triggerSubmitEvent();
            
            console.log(response.role);
            if (response.role === "admin" || response.role === "manager") {
              this.router.navigate(['/dashboard']);
            }
            
            console.log(response);
            this.close.emit();
          } else {
            console.log("Something went wrong");
          }
        },
        (error: any) => {  
          if (error.error.jwt == "Invalid email or password") {
            this.erro_de_connecter = true;
          } else if (error.error.jwt == "Veuillez activer votre compte en vérifiant votre e-mail.") {
            this.erro_de_validation = true;
          } else {
          }
        }
      );
  
      this.formSubmitted_connecter = true;
    } else {
      this.formSubmitted_connecter = true;
    }
  }
  

  closePopup() {
    this.close.emit();
  }

  Va:boolean=false
  seatch(){
    this.Va=!this.Va
  }  
  ngOnInit(){}

  eyePwdLogin = faEyeSlash;
  eyePwd = faEyeSlash;
  eyeConfirmPwd = faEyeSlash;

  hidePasswordLogin = true;
  hidePassword = true;
  hideConfirmPassword = true;

  togglePasswordLoginVisibility(): void {
    this.hidePasswordLogin = !this.hidePasswordLogin;
    this.eyePwdLogin = this.hidePasswordLogin ? faEyeSlash : faEye;
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