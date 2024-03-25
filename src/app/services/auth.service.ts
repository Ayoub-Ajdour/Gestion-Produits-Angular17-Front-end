import { Injectable, inject, signal } from '@angular/core';
import { User } from '../../model/userApp.model';
import { Observable, from, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, user } from '@angular/fire/auth';
import { response } from 'express';
import { UserInterface } from '../../model/userInterface';
import { Auth, GoogleAuthProvider, signInWithRedirect } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  users: User[]=[];
  userAuth:User|undefined;
  auth:boolean = false;
  private apiUrl = 'http://localhost:8090/api/v1/users'; 
  firebaseAuth = inject(Auth);
  user$=user(this.firebaseAuth);
  currentUserSig=signal<UserInterface|null|undefined>(undefined);
  constructor(private http: HttpClient,private afAuth: Auth,private router: Router) {
    // this.users = [
    //   { user_id: 1, username: "user1", password: "1234", roles: ["ADMIN", "USER"] },
    //   { user_id: 2, username: "user2", password: "1234", roles: ["USER"] },
    //   { user_id: 3, username: "admin", password: "admin", roles: ["ADMIN"] }
    // ];
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        this.users = response; 
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  addUser(username: string, email: string, password: string):Observable<User>{
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
    .then(response => {
        return updateProfile(response.user, { displayName: username });
    });    const newUser: User = {
      username: username,
      email: email,
      password: password,
      roles: "user"
    };
     alert("hi "+ username);
    return this.http.post<User>(this.apiUrl, newUser);
 }
  public login(username:string,password:string):Observable<void>{
    const promise=signInWithEmailAndPassword(this.firebaseAuth,username,password).then(()=>{});
    return from(promise);
    // let userAppModel = this.users.find(user=>user.username==username);
    // if(userAppModel==undefined){
    //   return throwError(()=>new Error("this user doesn't exist"));
    // }
    // if(userAppModel.password!=password){
    //   return throwError(()=>new Error("password incorrect"));
    // }
    // return of(userAppModel);
  }
  async loginwithgoogle():Promise<Observable<boolean>>{
    await signInWithPopup(this.afAuth, new GoogleAuthProvider())
  .then(googleResponse => {
    console.log("paaaaaaaaas erooooooor 👌"+googleResponse.user.displayName);
   return of(true);
  })
  .catch(err => {
    console.log("erooooooooooooooorr 😒"+err);
  });
  return of(false);
    console.log("++");
  }
  public authenticat():Observable<boolean>{
    this.isAuthenticat();
    this.auth=true;
    return of(true)
  }
  public isAuthenticat():boolean{
    return (this.auth);
  }
 
}
