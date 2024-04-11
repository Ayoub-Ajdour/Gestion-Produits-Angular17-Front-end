import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../model/userApp.model";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    users!:Array<any>;
    private apiUrl = 'http://localhost:8090/api/v1/users';
    constructor(private http: HttpClient) {}
    public getUsers():Observable<any[]>{
        return this.http.get<any[]>(this.apiUrl);
       }
       public deleteUser(u:User):Observable<boolean>{
        console.log(u.user_id+' '+ u.username+" haaaa9 mchaa");
        return this.http.delete<boolean>(`${this.apiUrl}/${u.user_id}`)
       }
    
  }