import { Component, HostListener, OnInit , Directive, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../../model/userApp.model';


@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})

export class AuthComponentComponent implements OnInit{
  showSignInForm = true;
  formGroup!:FormGroup;
  error!:string;
  errorMESSAGE:string='';
  isSignUpMode = false;
  user:User|undefined;
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private router: Router,private fb:FormBuilder,private auth: AuthService,private el: ElementRef) {}

  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  






  
  ngOnInit(): void {
    
    this.formGroup=this.fb.group({
      username:this.fb.control(null),
      password:this.fb.control(null)
    })
  }
  signIn() {
        this.auth.login(this.username,this.password).subscribe({
      next:()=>{
        this.auth.authenticat().subscribe({
          next:()=>{
            
            this.router.navigateByUrl("/accueil");
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
                  
                  this.router.navigateByUrl("/accueil");
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

  signUp() {
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
      this.errorMESSAGE = errorMessages.join(' ');
  
      
     
  }else{
    console.log(this.username,this.email,this.password);
    this.auth.addUser(this.username,this.email,this.password).subscribe({
      next:(data)=>{
        this.auth.authenticat().subscribe({
          next:(data)=>{
            console.log("added 👌!");

            this.router.navigateByUrl("/accueil");
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