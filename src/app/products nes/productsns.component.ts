import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { product } from '../products/product';
import { ProductService } from '../services/product.service';
import { AppComponent } from '../app.component';
import {ProductsDetailsComponent} from '../products-details/products-details.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-productsns',
  standalone: true,
  imports: [AppComponent,ProductsDetailsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponentns implements OnInit,OnChanges,OnDestroy{
awitnslproducts() {

  this.router.navigate(['/accueil/products']);
  this.animateSeeMore();
}
animateSeeMore() {
  const seeMoreElement = document.querySelector('.see-more');
  if (seeMoreElement) {
    seeMoreElement.classList.add('animate');
    setTimeout(() => {
      seeMoreElement.classList.remove('animate');
    }, 1000); // Duration of the animation
  }
}
  i:number=0;
  @ViewChild('exampleModal',{static:false}) exampleModal?:ElementRef;
description: string|undefined;
close() {
  (this.exampleModal?.nativeElement as HTMLElement).style.display = 'none';
  document.body.classList.remove('modal-open');
  document.querySelector('.modal-backdrop')?.classList.remove('show');
  (document.querySelector('.modal-backdrop') as HTMLElement).style.display='none';

  document.querySelector('.modal-backdrop')?.remove();
}
tkherbiqa:string|undefined;
  productselected!: product;
open(p:product) {
  (this.exampleModal?.nativeElement as HTMLElement).style.display = 'block';
   (this.exampleModal?.nativeElement as HTMLElement).classList.add('show');
    document.body.classList.add('modal-open');

let el = document.createElement('div');

el.className = 'modal-backdrop fade show';

el.style.display = 'block';

document.body.appendChild(el);
  this.tkherbiqa=p.name;
  this.productselected=p;
  this.description=p.description;
  }
  buyingandclose(p:product){
    this.buying(p);
    this.close();
  }
  closeResult: string | undefined;
getColorClass(arg0: any) {
throw new Error('Method not implemented.');
}
  


  products!:Array<any>;
  errorMessage:string|undefined;
  qereebysali :boolean | undefined;
  constructor(private ps : ProductService,private appComponent: AppComponent,private router: Router){
    
  }
  ngOnDestroy(): void {
    console.log("OnDestroy Declared !!");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChange Declared !!");
  }
  ngOnInit(): void {
    console.log("OnInit Declared !!");
    
    
  this.getAllProduct();
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  getAllProduct(){
    this.ps.getAllProdcuts().subscribe(
      {
        next:(value:any[])=> {
          this.products=value;
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
  deleteProduct(p:product):void{
    // let conf=confirm("Did you want to delete "+p.name+" ?? ");
    // if(conf==false)return;
    this.ps.deleteProduct(p.id).subscribe(
      {
        next:(value:any)=> {
       //   alert(p.name+" deleted 👌");
         let index=this.products.indexOf(p);
         this.products.splice(index,1);
        // this.getAllProduct();
        },
        error:(err:any) =>{
          this.errorMessage=err;
        },
      }
     )
  }
  buying(p:product) :void{
    if(p.quantity<=5){
      p.qeerebyasali=true;
    }
    this.ps.buying(p).subscribe(
      {
        next:(value:any)=> {
        console.log(p.quantity);
        // if(p.quantity==0){
        //    this.deleteProduct(p);
        // }
        },
        error:(err:any) =>{
          this.errorMessage=err;
        },
      }
     )
     this.ps.addToCart(p);
     this.appComponent.getAllcarts();
    //  this.appComponent.incrementRaqm();
     
  }
  
  // open(p:product) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  
}
