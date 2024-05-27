import { Component, HostListener, OnInit , Directive, ElementRef, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../../model/userApp.model';
import { TranslateModule} from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';


@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,TranslateModule,ReactiveFormsModule],
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})

export class AuthComponentComponent implements OnInit{

  showSignInForm = true;
  form!:FormGroup;
  formInscription!:FormGroup;
  error!:string;
  errorMESSAGE:string='';
  isSignUpMode = false;
  user:User|undefined;
  username: string = '';
  password: string = '';
  email: string = '';
  address:string='';

  constructor(private router: Router,private fb:FormBuilder,private auth: AuthService) {}
  translateService=inject(TranslationService);
  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  
  english(){
    console.log("change Lang");
    this.translateService.setDefaultLang('en-us');
  }
  arabic(){
    console.log("change Lang");
    this.translateService.setDefaultLang('ar-ma');
  }
  tamazight() {
    console.log("change Lang");
    this.translateService.setDefaultLang('ta-ma');
  }
  ngOnInit(): void {
    this.translateService.setDefaultLang('en-us');
    this.form=this.fb.group({
      username:['',Validators.required,Validators.email],
      password:''
    });
    this.formInscription = this.fb.group({
  username: ['', [Validators.required, this.customUsernameValidator()]],
  email: ['', [Validators.required, Validators.email]],
  address: ['', [Validators.required, Validators.minLength(2)]],
  password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10), this.customPasswordValidator()]]
});
  }
  customPasswordValidator() {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value;
  
      if (!value) {
        return { required: true };
      }
  
      if (value.length < 4 || value.length > 10) {
        return { minlength: true, maxlength: true };
      }
  
      if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{4,10}$/.test(value)) {
        return { pattern: true };
      }
  
      return null;
    };
  }
  
  customUsernameValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) {
        return { required: true };
      }
      if (value.trim().length < 8 || !/\s/.test(value)) {
        return { invalidFormat: true };
      }
      return null;
    };
  }
  signIn() {
    this.username=this.form.value.username;
    this.password=this.form.value.password;
        this.auth.login(this.username,this.password).subscribe({
      next:()=>{
        this.auth.authenticat().subscribe({
          next:()=>{
            
            this.router.navigateByUrl("/accueil/pageaccueil");
          },
          error:(err)=>{this.error=err}
        })
        // console.log("nice 💚");
        // this.router.navigateByUrl("/accueil");
      },
      error:(err)=>{
        this.error=err;
      }
    })
  }
  
  async loginwithgoogle(){
    (await this.auth.loginwithgoogle()).subscribe({
      next:()=>{
               console.log("nice 💚💚💚💚💚");
               this.auth.authenticat().subscribe({
                next:()=>{
                  
                  this.router.navigateByUrl("/accueil/pageaccueil");
                },
                error:(err)=>{this.error=err}
              })
      },
    });
    console.log("++");
  }
  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{4,10}$/;
    return passwordPattern.test(password);
}
validateEmail(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
validateUsername(username: string): boolean {
  const usernamePattern = /^[a-zA-Z0-9._%+-]+[' ']+[a-zA-Z]{2,}$/;
  return usernamePattern.test(username);
}

validateadress(address: string): boolean {
  const usernamePattern = /^[a-zA-Z0-9._%+-]+[' ']+[a-zA-Z]{2,}$/;
  return usernamePattern.test(address);
}
ale:boolean=false;
  signUp() {
    if(this.formInscription.invalid){
      this.ale=true;
    }
    this.username=this.formInscription.value.username;
    this.password=this.formInscription.value.password;
    this.address=this.formInscription.value.address;
    this.email=this.form.value.email;
    if (!this.validateUsername(this.username) || !this.validateEmail(this.email) || !this.validatePassword(this.password)) {
      console.log("Invalid fields. Please check your input.");
      let errorMessages: string[] = [];
      if (!this.validateUsername(this.username)) {
          errorMessages.push('Invalid Username');
      }
      if (!this.validateEmail(this.email)) {
          errorMessages.push('Invalid Email');
      }
      if (!this.validatePassword(this.password)) {
          errorMessages.push('Invalid Password');
      }
      if (!this.validateadress(this.address)) {
        errorMessages.push('Invalid address');
    }
      this.errorMESSAGE = errorMessages.join(' ');
  
      
     
  }else{
    console.log(this.username,this.email,this.password);
    this.auth.addUser(this.username,this.email,this.password,this.address).subscribe({
      next:(data)=>{
        this.auth.authenticat().subscribe({
          next:(data)=>{
            console.log("added 👌!");

            this.router.navigateByUrl("/accueil/pageaccueil");
          },
          error:(err)=>{this.error=err}
        })

      },
      error:(err)=>{
        this.error=err;
      }
    })}
  }
  showSignUp() {
    this.isSignUpMode = true;
  }

  showSignIn() {
    this.isSignUpMode = false;
  }

  getContainerClass() {
    return {
      container: true,
      'sign-up-mode': this.isSignUpMode,
    };
  }
  
}