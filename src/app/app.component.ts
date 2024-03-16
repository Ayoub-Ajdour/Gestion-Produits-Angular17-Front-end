import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet ,RouterModule} from '@angular/router';
import { AuthService } from './services/auth.service';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user ,signOut} from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(){

  }
  firebaseAuth = inject(Auth);
  authService=inject(AuthService);
  signout(){
    this.firebaseAuth.signOut();
    
  }
  ngOnInit(): void {
     this.authService.user$.subscribe(user=>{
      if(user){
        this.authService.currentUserSig.set({
          email:user.email!,
          username:user.displayName!,
        })
      }
      else{
        this.authService.currentUserSig.set(null);
      }
      
      console.log("acount li ikcmn is "+this.authService.currentUserSig()?.username);
     })
  }
  static raqm(arg0: number) {
    throw new Error('Method not implemented.');
  }
  title = 'BioToudert';
  private _raqm: number=0;
  public get raqm(): number {
    return this._raqm;
  }
  public set raqm(value: number) {
    this._raqm = value;
  }
}
