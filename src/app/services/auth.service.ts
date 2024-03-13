import { Injectable } from '@angular/core';
import { User } from '../../model/userApp.model';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  users: User[]=[];
  userAuth:User|undefined;
  private apiUrl = 'http://localhost:8090/api/v1/users'; 

  constructor(private http: HttpClient) {
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
    const newUser: User = {
      username: username,
      email: email,
      password: password,
      roles: "user"
    };
    
    alert("hi "+ username);
    return this.http.post<User>(this.apiUrl, newUser);
 }
  public login(username:string,password:string):Observable<User>{
    let userAppModel = this.users.find(user=>user.username==username);
    if(userAppModel==undefined){
      return throwError(()=>new Error("this user doesn't exist"));
    }
    if(userAppModel.password!=password){
      return throwError(()=>new Error("password incorrect"));
    }
    return of(userAppModel);
  }

  public authenticat(user:User):Observable<boolean>{
    this.userAuth=user;
    localStorage.setItem("user",JSON.stringify({username:user.username,roles:user.roles,jwt:"JWT Athentification"}))
    return of(true)
  }
  public isAuthenticat():boolean{
    return (this.userAuth!=undefined);
  }
}
