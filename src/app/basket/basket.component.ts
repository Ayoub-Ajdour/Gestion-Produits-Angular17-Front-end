import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserStock } from '../../model/UserStock.model';
import { product } from '../products/product';
import { ProductsDetailsComponent } from '../products-details/products-details.component';
import { CommonModule } from '@angular/common';

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

  getAllcarts() {
    this.productService.getAllCarts().subscribe({
      next: (value: UserStock[]) => {
        this.carts = value;
        this.loadProductsForCarts();
      },
      error: (err: any) => {
        console.error('Error fetching carts:', err);
      }
    });
  }

  loadProductsForCarts(): void {
    this.carts.forEach(cart => {
      this.productService.findById(cart.productId).subscribe(
        (product: product) => {
          this.tamannkolchi += product.price * cart.quantity;
        },
        error => {
          console.error('Error fetching product:', error);}
        
      );

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
        error => {
          console.error('Error fetching product for cart:', error);
        }
      );

      this.raqm += cart.quantity;
    });
    console.log(this.productsAct);
  }

  ngOnInit(): void {
    this.getAllcarts();
    this.productService.carta$.subscribe(cart => {
      this.carts = cart;
      console.log('Current carts:', this.carts);
    });
  }
}
