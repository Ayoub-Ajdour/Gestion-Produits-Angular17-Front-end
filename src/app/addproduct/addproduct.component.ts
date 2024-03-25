import { Component } from '@angular/core';
import { product } from '../products/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
_product!:product;
quantity: number=0;
name: string='';
price: number=0;
selectedType:string='';
description: string='';
alert = { class: 'alert-info', message: 'Please enter the required' };
types: string[] = ['Honey', 'Natural Oils', 'Traditional spread in Moroccan cuisine','Natural dried threads'];
constructor(private ps : ProductService){
    
}
syncSaveProduct(): void {
  this.alert = { class: "alert-warning", message: "Please wait" };
  setTimeout(() => {
    this.saveProduct2();
  }, 2000); // Delay of 2000 milliseconds (2 seconds)
}

async saveProduct2(): Promise<void> {
  this.submitted = true;
  this.disabledStatus = true; 
  const params = new product(
    1,
     this.name,
     this.price,
     '1.png',
     this.selectedType,
     this.quantity,
     this.quantity<5?true:false,
     this.description,
     '1.png',
     false
  );
  
  console.log(params);
    await new Promise(resolve => setTimeout(resolve, 2000));
  this.ps.createProduct(params).subscribe((createdProduct: product) => {
    console.log('Product created:', createdProduct);
    this.alert = { class: 'alert-success', message: 'Product information has been successfully saved' };
  }, (error) => {
    console.error('Error creating product:', error);
    this.alert = { class: 'alert-danger', message: 'Product information matsavaach' };

  });
  //  this.http.post<Product>(this.baseUrl, product).pipe(
  //   tap((createdProduct: Product) => {
  //     console.log('Product created:', createdProduct);
  //   })
  // );


  if (!this.submitted) {
    console.log("Form is valid. Saving...");

  } else {
    console.log("Form is invalid. Cannot save.");
  }
}
submitted = false;
  disabledStatus = false;
  onKeyPress(event: KeyboardEvent): boolean {
    const element = event.target as HTMLInputElement;

    if (element.type === "number" || element.type === "tel") {
      const key = event.keyCode || event.which || event.charCode;
      return key <= 31 || (key >= 48 && key <= 57);
    }
    return true;
  }

  onInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.validateElement(element);
  }

  validateElement(element: HTMLInputElement): void {
    if (!element.value || element.value.length === 0) {
      if (element.getAttribute("required") !== null) {
        this.setMessage(element, `Please enter ${element.getAttribute("placeholder")}`);
      }
    } else {
      if (element.classList.contains("name")) {
        if (element.value.trim().split(" ").length < 2) {
          this.setMessage(element, `${element.getAttribute("placeholder")} Enter full name`);
        }
      }
      if (element.classList.contains("mobile")) {
        if (!element.value.startsWith("07") && !element.value.startsWith("06")) {
          this.setMessage(element, `${element.getAttribute("placeholder")} The number could start with 06 or 07`);
        }
        if (element.value.length !== 10) {
          this.setMessage(element, `${element.getAttribute("placeholder")} The number must consist of 10 numbers`);
        }
      }
      if (element.classList.contains("email")) {
        const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!expression.test(element.value)) {
          this.setMessage(element, `${element.getAttribute("placeholder")} Email syntax is not correct`);
        }
      }
      if (element.classList.contains("Address")) {
        if (element.value.length < 3) {
          this.setMessage(element, `${element.getAttribute("placeholder")} Should have 3 letters`);
        }
      }
    }
  }

  setMessage(element: HTMLInputElement, message: string | null): void {
    const formGroup = element.closest(".form-group") as HTMLElement;
    const invalidFeedback = formGroup.querySelector(".invalid-feedback") as HTMLElement;
  
    if (!invalidFeedback) {
      const invalidFeedbackElement = document.createElement("div");
      invalidFeedbackElement.classList.add("invalid-feedback");
      formGroup.appendChild(invalidFeedbackElement);
    }
  
    if (message !== null) {
      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
      invalidFeedback!.innerText = message;
    } else {
      element.classList.remove("is-invalid");
      element.classList.add("is-valid");
      invalidFeedback!.innerText = "";
    }
  }
  
  isValidForm(): string | null {
    let result: string | null = null;
    const inputs = Array.from(document.querySelectorAll(":input")).reverse();
    for (const input of inputs) {
      this.validateElement(input as HTMLInputElement);
      const invalidFeedback = (input as HTMLInputElement).closest(".form-group")?.querySelector(".invalid-feedback") as HTMLElement;
      if (invalidFeedback && invalidFeedback.innerText) {
        result = invalidFeedback.innerText;
        (input as HTMLInputElement).focus();
        break; // Stop the loop once the first error is found
      }
    }
    return result;
  }
  
  

  
}
