import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../products/product';
@Component({
  selector: 'app-promoproductsdetails',
  standalone: true,
  imports: [],
  templateUrl: './promoproductsdetails.component.html',
  styleUrl: './promoproductsdetails.component.css'
})
export class PromoproductsdetailsComponent {
 
  @Input() p :product | undefined;
  @Output() openDetProduct = new EventEmitter();
  @Output() deletingso = new EventEmitter();
  @Output() promoevt = new EventEmitter();

  
  openDetProducts() {
    this.openDetProduct.emit();
  }
  
  getImageURL():string{
    return "assets/images/"+this.p?.urlImage;
  }
  deleteproduct(){
    console.log("deleted 1 👌");
    this.deletingso.emit();
  }
  promo() {
    console.log(this.p+" promo 😘");
    this.promoevt.emit();
    }
    editproduct() {
    throw new Error('Method not implemented.');
    }
    
  }
  