import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Auth, signOut } from '@angular/fire/auth';
import { ProductService } from './services/product.service';
import { User } from '../model/userApp.model';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { UserStock } from '../model/UserStock.model';
import { product } from './products/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ProductsDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  a: boolean | undefined;
  nameofuser: string = '';
  userlidkhl: User | undefined;
  firebaseAuth = inject(Auth);
  authService = inject(AuthService);
  carts: Array<UserStock> = [];
  productsAct: Map<number, { product: product, quantity: number }> = new Map<number, { product: product, quantity: number }>();

  raqm: number = 0;

  constructor(private productService: ProductService, private router: Router) { }

  gotobasket() {
    this.router.navigate(['/accueil/basket']);
  }

  dihlproduct(id: number) {
    const ss = "/accueil/productpage?productId=" + id;
    this.router.navigate(['/accueil/productpage'], { queryParams: { productId: id } });
  }

  getImageURL(arg0: product) {
    return "assets/images/" + arg0.urlImage;
  }

  deleteCart(idproduct: number): void {
    console.log('Deleting cart item with ID:', idproduct);
    this.productService.deleteCart(idproduct).subscribe({
      next: (success: boolean) => {
        if (success) {
          console.log('Cart deleted successfully');
          this.carts = this.carts.filter(cart => cart.productId !== idproduct);
          this.updateProductsAct();
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

  signout() {
    this.firebaseAuth.signOut();
  }

  getAllcarts() {
    this.findUser().subscribe(
      (userId: number) => {
        console.log('User ID:', userId);
        this.carts = [];
        this.productService.getCartByUser(userId).subscribe({
          next: (value: UserStock[]) => {
            console.log("++😒😒😒");
            this.carts = value;
            this.loadProductsForCarts();
          },
          error: (err: any) => {
            console.error('Error loading carts:', err);
          },
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  loadProductsForCarts(): void {
    this.productsAct.clear();
    this.raqm = 0;

    this.carts.forEach(cart => {
      this.productService.getProductCart(cart.productId).subscribe(
        (product: product) => {
          const existingEntry = this.productsAct.get(product.id);
          if (existingEntry) {
            existingEntry.quantity += cart.quantity;
          } else {
            this.productsAct.set(product.id, { product, quantity: cart.quantity });
          }
          this.raqm += cart.quantity;
        },
        (error: any) => {
          console.error('Error loading product:', error);
        }
      );
    });

    console.log(this.productsAct);
  }

  updateProductsAct(): void {
    this.productsAct.clear();
    this.raqm = 0;

    this.carts.forEach(cart => {
      this.productService.getProductCart(cart.productId).subscribe(
        (product: product) => {
          const existingEntry = this.productsAct.get(product.id);
          if (existingEntry) {
            existingEntry.quantity += cart.quantity;
          } else {
            this.productsAct.set(product.id, { product, quantity: cart.quantity });
          }
          this.raqm += cart.quantity;
        },
        (error: any) => {
          console.error('Error loading product:', error);
        }
      );
    });

    console.log(this.productsAct);
  }

  ngOnInit(): void {
    this.getAllcarts();
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
        this.nameofuser = user.displayName!;
        if (user.email != null) {
          this.productService.getUserActuel(user.email);
          this.productService.getUserByEmail(user.email).subscribe(
            (user: User) => {
              this.userlidkhl = user;
              console.log('User:', this.userlidkhl.user_id);
            },
            (error) => {
              console.error('Error:', error);
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
      }
      console.log("account li ikcmn is " + this.authService.currentUserSig()?.username);
    });
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
            this.productService.getUserByEmail(user.email).subscribe(
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

  title = 'BioToudert';
}
