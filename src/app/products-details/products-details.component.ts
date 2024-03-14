import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../products/product';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent {
@Input() p :product | undefined;
@Output() openDetProduct = new EventEmitter();
@Output() buyingso = new EventEmitter();

openDetProducts() {
  this.openDetProduct.emit();
}

getImageURL():string{
  return "assets/images/"+this.p?.url_image;
}
buying(){
  this.buyingso.emit();
}
}
