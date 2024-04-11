import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { product } from '../products/product';
import { ProductService } from '../services/product.service';
import { AppComponent } from '../app.component';
import {ProductsDetailsComponent} from '../products-details/products-details.component'
import { UsersdetailsComponent } from '../usersdetails/usersdetails.component';
import { UserService } from '../services/user.service';
import { User } from '../../model/userApp.model';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersdetailsComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit,OnChanges,OnDestroy{

  users!:Array<any>;
description: string|undefined;

tkherbiqa:string|undefined;
  productselected!: product;

  


 
  errorMessage:string|undefined;
  qereebysali :boolean | undefined;
  constructor(private us : UserService){
    
  }
  ngOnDestroy(): void {
    console.log("OnDestroy Declared !!");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChange Declared !!");
  }
  ngOnInit(): void {
    console.log("OnInit Declared !!");
    
    
  this.getAllUsers();
  
  }
  
  trackByIndex(index: number, item: any): number {
    return index;
  }
  getAllUsers(){
    this.us.getUsers().subscribe(
      {
        next:(value:any[])=> {
          this.users=value;
        },
        error:(err:any) =>{
          this.errorMessage=err;
        },
      }
     )
  }

  getImageURL(p : product){
    return "assets/images/"+p.urlImage;
  }
  getImageURLtanya(p : product):string{
    return "assets/images/"+p.urlImagetanya;
  }
  deleteUser(u:User):void{
    let conf=confirm("Did you want to delete "+u.username +" ?? ");
    if(conf==false)return;
    this.us.deleteUser(u).subscribe(
      {
        next:(value:any)=> {
         let index=this.users.indexOf(u);
         this.users.splice(index,1);
        },
        error:(err:any) =>{
          this.errorMessage=err;
        },
      }
     )
  }
 
  
  
  
}


