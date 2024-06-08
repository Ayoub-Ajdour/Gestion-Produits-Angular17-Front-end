import { Component, OnInit } from '@angular/core';
import { product } from '../products/product';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,TranslateModule,ReactiveFormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  errorMessage: any;
addtobasket():void{
  
  if(this.product!.quantity<=5){
    this.product!.qeerebyasali=true;
  }
  this.productService.buying(this.product!).subscribe(
    {
      next:(value:any)=> {
      console.log(this.product!.quantity);
      // if(p.quantity==0){
      //    this.deleteProduct(p);
      // }
      },
      error:(err:any) =>{
        this.errorMessage=err;
      },
    }
   )
   this.productService.addToCart(this.product!);
   this.appComponent.getAllcarts();
  //  this.appComponent.incrementRaqm();
   
}
wishlist:boolean=false;
addtowishlist() {
  this.wishlist=!this.wishlist;
}
ziid() {
  ++this.quantitylibgha;
  this.pricenssigran=this.priceaf*this.quantitylibgha;
}
n9ess() {
  if(this.quantitylibgha>1){
--this.quantitylibgha; 
this.pricenssigran=this.priceaf*this.quantitylibgha;
 }
}
  quantitylibgha: number = 1;
  getvaluep() :string{
return "+";}
getvaluen() :string{
  return "-";}
  product: product | undefined;
  isActive: boolean[] = [true, false];
  priceaf:number=0;
  price:number=0;
  pricenss:number=0;
  pricenssigran:number=0;
  image:string='';
  toggleActive(index: number) {
    
    // this.isActive[index] = !this.isActive[index];
    if(index==1){
      this.isActive[1]=true;
      this.isActive[2]=false;
      this.priceaf=this.price;
      this.pricenssigran=this.priceaf*this.quantitylibgha;
      this.image=this.getImageURL();
    }
    else if(index==2){
      this.isActive[2]=true;
      this.isActive[1]=false;
      this.priceaf=this.pricenss;
      this.pricenssigran=this.priceaf*this.quantitylibgha;
      this.image=this.getImageURL();

    }
    else{
      alert(index);
    }
  }
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,private appComponent: AppComponent
  ) {}
  resetIsActive() {
    this.isActive = [false, false];
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productId = params['productId'];
      if (productId) {
        this.productService.findById(productId).subscribe(product => {
          this.product = product;
          this.priceaf=this.price=product.price;
          this.pricenss=this.price/2;
          this.pricenssigran=this.priceaf;
          this.image="assets/images/"+this.product?.urlImage;
        });
      }
    });
  }
  getImageURL():string{
    if(this.isActive[1]){
    return "assets/images/"+this.product?.urlImage;}else{
      return "assets/images/"+this.product?.urlImagetanya;
    }
  }
}