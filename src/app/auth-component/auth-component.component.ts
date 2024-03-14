import { Component, OnInit } from '@angular/core';
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
  isSignUpMode = false;
  user:User|undefined;
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private router: Router,private fb:FormBuilder,private auth: AuthService) {}
  ngOnInit(): void {
    
    this.formGroup=this.fb.group({
      username:this.fb.control(null),
      password:this.fb.control(null)
    })
  }
  signIn() {
    alert('Hey ' + this.username + '  password :  ' + this.password);
        this.auth.login(this.username,this.password).subscribe({
      next:()=>{
        // this.user=data;
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
  

  signUp() {
    console.log(this.username,this.email,this.password);
    this.auth.addUser(this.username,this.email,this.password).subscribe({
      next:(data)=>{
        this.auth.auth=true;
        console.log("added 👌!");
        this.router.navigateByUrl("/accueil")
        this.username='';
        this.password='';
        this.email='';

      },
      error:(err)=>{
        this.error=err;
      }
    })
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