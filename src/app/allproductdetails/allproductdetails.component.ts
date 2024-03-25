import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../products/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allproductdetails',
  standalone: true,
  imports: [],
  templateUrl: './allproductdetails.component.html',
  styleUrl: './allproductdetails.component.css'
})
export class AllproductdetailsComponent {

  @Input() p :product | undefined;
  @Output() openDetProduct = new EventEmitter();
  @Output() deletingso = new EventEmitter();
  @Output() promoevt = new EventEmitter();
constructor(private router: Router){

}
  
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
      this.router.navigate(['accueil/updateproduct', this.p!.id]);
    }
    
  }
  