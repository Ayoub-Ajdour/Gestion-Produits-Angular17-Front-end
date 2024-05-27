import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserStock } from '../../model/UserStock.model';
import { product } from '../products/product';
import { ProductsDetailsComponent } from '../products-details/products-details.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../model/userApp.model';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ProductsDetailsComponent],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  tamannkolchi: number = 0;
  carts!: Array<UserStock>;
  raqm: number = 0;
  productsAct: Map<Array<product>, number> = new Map<Array<product>, number>();
  authService=inject(AuthService);
  nameofuser: string|undefined;
  userlidkhl: User|undefined;
  a: boolean|undefined;


  constructor(private productService: ProductService, private router: Router) {}

  getImageURL(arg0: product) {
    return "assets/images/" + arg0.urlImage;
  }
  
  dihlproduct(id: number) {
    const ss = "/accueil/productpage?productId=" + id;
    this.router.navigate(['/accueil/productpage'], { queryParams: { productId: id } });
  }

  deleteCart(idproduct: number): void {
    console.log('Deleting cart item with ID:', idproduct);
    this.productService.deleteCart(idproduct).subscribe({
      next: (success: boolean) => {
        if (success) {
          console.log('Cart deleted successfully');
          // this.carts = this.carts.filter(cart => cart.productId !== idproduct);
          this.productService.checkProductExistence(idproduct).subscribe((u:UserStock)=>{
            let index=this.carts.indexOf(u);
             this.carts.splice(index,1);
          })
        //   let index=this.carts.indexOf();
        //  this.carts.splice(index,1);
        } else {
          console.error('Failed to delete cart');
        }
      },
      error: (err: any) => {
        console.error('Error deleting cart item:', err);
        if (err.status === 404) {
          console.error('Cart item not found. ID:', idproduct);
        }
      }
    });
  }

  getAllcarts(){
    this.findUser().subscribe(
      (userId: number) => {
        console.log('User ID:', userId);
     
    this.productService.getCartByUser(userId).subscribe(
      {

        next:(value:UserStock[])=> {
         
          console.log("++😒😒😒");
          this.carts=value;
          this.loadProductsForCarts();
        },
        error:(err:any) =>{
          this.carts=err;
        },
      }
     ) },
     (error) => {
       console.error('Error:', error);
     }
   );
  }
  loadProductsForCarts(): void {
    this.carts.forEach(cart => {
    this.productService.getProductCart(cart.productId).subscribe(
      
      (product: product) => {
        this.tamannkolchi+=product.price*cart.quantity;
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

  findUser(): Observable<number> {
    return new Observable<number>((observer) => {
      this.authService.user$.subscribe(user => {
        if (user) {
          this.authService.currentUserSig.set({
            email: user.email!,
            username: user.displayName!,
          });
          this.nameofuser = user.displayName!;
          if (user.email != null) {
            this.productService.getUserActuel(user.email);
            this.productService.getUserByEmail(user.email)
              .subscribe(
                (user: User) => {
                  this.userlidkhl = user;
                  observer.next(user.user_id); // Emitting user_id
                  observer.complete(); // Completing the observable
                },
                (error) => {
                  console.error('Error:', error);
                  observer.error(error); // Emitting error
                }
              );
          }
          console.log('username ' + user.displayName + ' email ' + user.email);
          if (user.email === 'admin@biotoudert.com') {
            this.a = false;
          } else {
            this.a = true;
          }
        } else {
          this.authService.currentUserSig.set(null);
          observer.next(0); // Emitting 0 when there's no user
          observer.complete(); // Completing the observable
        }
        console.log("account li ikcmn is " + this.authService.currentUserSig()?.username);
      });
    });
  }
  ngOnInit(): void {
    this.getAllcarts();
    this.productService.carta$.subscribe(cart => {
      this.carts = cart;
      console.log('Current carts:', this.carts);
    });
  }
}
