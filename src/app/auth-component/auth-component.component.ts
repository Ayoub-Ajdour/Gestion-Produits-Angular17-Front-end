import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../../model/userApp.model';
import { Observable } from 'rxjs';

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
    // if (this.username == 'ayoub' && this.password == '1234') {
    //   // alert('hey');
    //   this.router.navigate(['/accueil']);
    // }



    // console.log(this.formGroup.value)
    // let username=this.formGroup.value.username;
    // let password=this.formGroup.value.password;
    this.auth.login(this.username,this.password).subscribe({
      next:(data)=>{
        this.user=data;
        this.auth.authenticat(this.user).subscribe({
          next:()=>{
            this.router.navigateByUrl("/accueil");
          },
          error:(err)=>{this.error=err}
        })
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
        // this.user=data;
        // this.auth.authenticat(this.user).subscribe({
        //   next:()=>{
        //     this.router.navigateByUrl("/accueil");
        //   },
        //   error:(err)=>{this.error=err}
        // })
        console.log("added 👌!");
        this.username='';
        this.password='';
        this.email='';

      },
      error:(err)=>{
        this.error=err;
      }
    })
    // return this.auth.addUser(this.username,this.email,this.password);
  }

  showSignUp() {
    this.isSignUpMode = true;
  }

  showSignIn() {
    this.isSignUpMode = false;
  }

  // Function to dynamically set the container class
  getContainerClass() {
    return {
      container: true,
      'sign-up-mode': this.isSignUpMode,
    };
  }
  
}