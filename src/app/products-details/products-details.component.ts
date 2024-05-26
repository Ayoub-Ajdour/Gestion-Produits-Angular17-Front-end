import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../products/product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent {
  constructor(private router: Router){
    
  }

@Input() p :product | undefined;
@Output() openDetProduct = new EventEmitter();
@Output() buyingso = new EventEmitter();

openDetProducts() {
  this.openDetProduct.emit();
}

getImageURL():string{
  return "assets/images/"+this.p?.urlImage;
}
buying(){
  this.buyingso.emit();
}
gotoproductpage(p:product) {
  this.router.navigate(['/accueil/productpage'], { queryParams: { productId: p.id } });

}
}
