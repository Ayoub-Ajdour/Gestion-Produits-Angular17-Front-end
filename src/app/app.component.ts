import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet ,RouterModule} from '@angular/router';
import { AuthService } from './services/auth.service';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user ,signOut} from '@angular/fire/auth';
import { ProductService } from './services/product.service';
import { User } from '../model/userApp.model';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { UserStock } from '../model/UserStock.model';
import { product } from './products/product';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule,ProductsDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
// minusCart(id: number) {
//   this.productService.minusCart(id).subscribe({
      
//     next: (value: any) => {
//       console.log(value+"  😒😒");
//       // let index = this.carts.findIndex(value); 
//       // if (index !== -1) { 
//       //   this.carts.splice(index, 1); 
//       // }
//     },
//     error: (err: any) => {
//       console.error('Error deleting cart item:', err);
//     }
//   });
// }
getImageURL(arg0: product) {
  return "assets/images/"+arg0.urlImage;
}

  a:boolean|undefined;
  constructor(private productService:ProductService){
    // this.getAllcarts();
  }
  
  nameofuser:string='';
  userlidkhl:User|undefined;
  firebaseAuth = inject(Auth);
  authService=inject(AuthService);
  carts!:Array<UserStock>;
  productsAct: Map<Array<product>, number> = new Map<Array<product>, number>();

  raqm:number=0;
  deleteCart(id: number) {
    this.productService.deleteCart(id).subscribe({
      
      next: (value: any) => {
        console.log(value+"  😒😒");
        // let index = this.carts.findIndex(value); 
        // if (index !== -1) { 
        //   this.carts.splice(index, 1); 
        // }
      },
      error: (err: any) => {
        console.error('Error deleting cart item:', err);
      }
    });
  }
  
  signout(){
    this.firebaseAuth.signOut();
    
  }
  getAllcarts(){
    this.productService.getAllCarts().subscribe(
      {
        next:(value:UserStock[])=> {
          this.carts=value;
          this.loadProductsForCarts();
        },
        error:(err:any) =>{
          this.carts=err;
        },
      }
     )
  }
  loadProductsForCarts(): void {
    this.carts.forEach(cart => {
    this.productService.getProductCart(cart.productId).subscribe(
      (product: product) => {
        const quantity = cart.quantity;
        const key = [product];
        const existingQuantity = this.productsAct.get(key);
        if (existingQuantity !== undefined) {
          this.productsAct.set(key, existingQuantity + quantity);
        } else {
          this.productsAct.set(key, quantity);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
    this.raqm+=cart.quantity;
    });
    console.log(this.productsAct);
   
  }
  
  ngOnInit(): void {
    this.getAllcarts();
    this.productService.carta$.subscribe(cart => {
     this.carts = cart;   
    });     
    this.productService.cart$.subscribe(cart => {
      // for(let i=0;i<cart.length;i++){
      //   this.raqm++;
      //   const newUserStock = {
      //     userId: 1,
      //     productId: cart[0].id,
      //     quantity: 1
      //   };
      //   this.carts.push(newUserStock);
      //   console.log('caaaaaaaaaaaaaaart 🫡🫡🫡' +cart[i].id+ "   | " +i);
      // }
    });     
    this.authService.user$.subscribe(user=>{
      if(user){
        this.authService.currentUserSig.set({
          email:user.email!,
          username:user.displayName!,
        
        })
        this.nameofuser=user?.displayName!;
        if(user.email!=null){
          this.productService.getUserActuel(user.email);
          this.productService.getUserByEmail(user.email)
          .subscribe(
            (user: User) => {
              this.userlidkhl = user;
              console.log('User:', this.userlidkhl);
            },
            (error) => {
              console.error('Error:', error);
            }
          );
      }
        console.log('username '+ user.displayName + 'email ' + user.email);
        if(user?.email=='admin@biotoudert.com'){
          this.a=false;
        }else{
          this.a=true;
        }
      }
      else{
        this.authService.currentUserSig.set(null);
      }
     
      console.log("acount li ikcmn is "+this.authService.currentUserSig()?.username);
     })
  }
 
  title = 'BioToudert';
  
}
