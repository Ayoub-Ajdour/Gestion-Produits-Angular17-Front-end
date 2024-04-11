import { Injectable} from '@angular/core';
import { product } from '../products/product';
import { BehaviorSubject, Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { error } from 'node:console';
import { User } from '../../model/userApp.model';
import { UserInterface } from '../../model/userInterface';
import { UserStock } from '../../model/UserStock.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  products!:Array<any>;
  carts!:Array<any>;
  private apiUrl = 'http://localhost:8090/api/v1/products'; 
  emailAct:string='';
  userAct:User|undefined;
  productAct:product|undefined;
  
  constructor(private http: HttpClient) {
    
    this.products=[
      {id :1,name:"Euphorbes Honey",price:300,url_image:"1.png",parttype:"Mountain Sidr Honey",quantity:10,qeerebyasali:false,url_imagetanya:"picture1.png",
      description:'a premium honey renowned for its rich and robust flavor, coupled with potential health benefits. Extracted through meticulous traditional methods, it maintains exceptional purity. Serving as a natural source of essential nutrients, including vitamins and minerals, Sidr honey contributes to overall well-being and immune system strength. Its versatility extends from a culinary delight to a skincare and haircare elixir. With a commitment to quality, sellers often provide customer satisfaction guarantees, emphasizing the unique position of Sidr honey in Middle Eastern and South Asian regions.'
    },
      {id:2,name:"Amlou",price:100,url_image:"2.png",parttype:"Traditional spread in Moroccan cuisine",quantity:7,qeerebyasali:false,url_imagetanya:"picture1.png",
      description:'a Moroccan delicacy, is a delectable spread made from almonds, argan oil, and honey. Known for its rich, nutty flavor and creamy texture, Amlou is not only a culinary delight but also a source of essential nutrients. The almonds provide a dose of healthy fats, while argan oil adds a unique touch with its distinct taste and potential health benefits. Often enjoyed with bread or as a topping, Amlou represents a harmonious blend of flavors and nutrition, making it a cherished part of Moroccan cuisine.'
    },
      {id:3,name:"Olive Oil",price:70,url_image:"3.png",parttype:"Natural Oils",quantity:23,qeerebyasali:false,url_imagetanya:"picture1.png",
      description:' a staple in Mediterranean cuisine, is not just a cooking ingredient but a symbol of health and well-being. Known for its rich, fruity taste and versatility, olive oil is a source of monounsaturated fats and antioxidants. Whether drizzled over salads, used in cooking, or enjoyed as a dipping sauce, olive oil adds a delightful depth to dishes. Its potential health benefits, including heart health and anti-inflammatory properties, make it a preferred choice for those seeking a wholesome culinary experience.'
    },
      {id:4,name:"Saffron",price:60,url_image:"4.png",parttype:"Natural dried threads",quantity:30,qeerebyasali:false,url_imagetanya:"picture1.png",
      description:'the "queen of spices," is a prized ingredient known for its distinct flavor, vibrant color, and aromatic essence. Derived from the Crocus sativus flower, saffron adds a unique touch to culinary creations. Beyond its culinary appeal, saffron is valued for potential health benefits, including antioxidant properties. Often used in dishes ranging from savory to sweet, saffron elevates the gastronomic experience, making it a sought-after spice in various cuisines globally.'
    },
    ]
   }
   public getAllProdcuts():Observable<product[]>{
    return this.http.get<product[]>('http://localhost:8090/api/v1/products');
   }
   public getAllCarts():Observable<UserStock[]>{    
    return this.http.get<UserStock[]>('http://localhost:8090/api/v1/carts');
   }

   public deleteProduct(id:number):Observable<boolean>{
    console.log("produit deleted 👌👌👌");
    
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
   }
   public deleteCart(id: number): Observable<boolean> {
    return this.http.get<UserStock>('http://localhost:8090/api/v1/carts/findbyproduct/' + id + '/' + this.userAct!.user_id).pipe(
      switchMap((userStock: UserStock) => {
        console.log("Cart " + userStock.id + " deleted 👌👌👌");
        return this.http.delete<boolean>('http://localhost:8090/api/v1/carts/' + userStock.id).pipe(
          catchError(error => {
            console.error("Error deleting cart:", error);
            return throwError(error);
          })
        );
      }),
      catchError(error => {
        console.error("Error finding user stock:", error);
        return throwError(error);
      })
    );
  }
  // minusCart(id: number):Observable<UserStock>{
  //   return this.http.put<UserStock>(`${this.apiUrl}/userstock/update/${id}`, );

  // }
   createProduct(params: product): Observable<product> {
   

 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(JSON.stringify(params));

    console.log(params.toString());
    return this.http.post<product>('http://localhost:8090/api/v1/products/add', params,httpOptions).pipe(
      tap((createdProduct: product) => {
        console.log('Product created:', createdProduct);
      }),
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(error);
  }
  updateproduct(product: product): Observable<product> {
    console.log('dakhl update quantity is '+product.quantity)

    console.log("hiii 👌👌 2", product.id);
    const url = `${this.apiUrl}/${product.id}`;
    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    return this.http.put<product>(url, product, httpOptions).pipe(
      catchError(error => {
        console.error('Error occurred while updating product:', error);
        return throwError(error);
      })
    );
  }
  
  addpromoo(product: product): Observable<product> {
    console.log("hiii 👌👌 2");
    const url = `${this.apiUrl}/${product.id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<product>(url, product, httpOptions).pipe(
      catchError(error => {
        console.error('Error occurred while updating product:', error);
        return throwError(error);
      })
    );
  }
  findById(productId: any): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/${productId}`);
  }
   public buying(p:product):Observable<boolean>{
   
    // console.log('1  quantity is '+p.quantity)
    p.quantity=p.quantity-1;
    // console.log('2  quantity is '+p.quantity)
    this.updateproduct(p).subscribe((updatedProduct: product) => {
      console.log('Product updated:', updatedProduct);
    }, (error) => {
      console.error('Error updating product:', error);  
    });
    // console.log('3  quantity is '+p.quantity)

    return of(true)
   }
   private cartSubject: BehaviorSubject<product[]> = new BehaviorSubject<product[]>([]);
   public cart$: Observable<product[]> = this.cartSubject.asObservable();
   private cartSubjecta: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
   public carta$: Observable<UserStock[]> = this.cartSubjecta.asObservable();
   
   aa(){
    this.getAllCarts().subscribe(
      {
        next:(value:any[])=> {
          this.carts=value;
        },
        error:(err:any) =>{
          this.carts=err;
        },
      }
     )
    this.cartSubjecta.next(this.carts);
   }
   getProductCart(id: number): Observable<product> {
    return this.findById(id);
}
   addToCart(product: product) {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = [...currentCart, product];
    this.cartSubject.next(updatedCart);
    
    console.log('Added to cart of ' + (this.userAct ? this.userAct.username : 'unknown'));
  
    const newUserStock = {
      userId: this.userAct?.user_id,
      productId: product.id,
      quantity: 1
    };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    console.log('New UserStock:', newUserStock);
    // this.carts.push(newUserStock);
    this.http.get<UserStock>('http://localhost:8090/api/v1/carts/findbyproduct/' + product.id + '/' + this.userAct!.user_id)
  .subscribe(
    (userStock) => {
      if (userStock != null) {
        // userStock.quantity++;
        // this.http.put<UserStock>('http://localhost:8090/api/v1/userstock/update/' + userStock.id, userStock)
        //   .subscribe(
        //     (updatedUserStock) => {
        //       console.log('UserStock updated successfully:', updatedUserStock);
        //     },
        //     (error) => {
        //       console.error('Error updating UserStock:', error);
        //     }
        //   );
      } else {
        // console.log('UserStock not found. Adding new UserStock...');     

        // this.http.post<any>('http://localhost:8090/api/v1/carts/add', newUserStock, httpOptions)
        //   .subscribe(
        //     (response) => {
        //       console.log('UserStock added successfully:', response);
        //     },
        //     (error) => {
        //       console.error('Error adding UserStock:', error);
        //     }
        //   );
      }
    },
    (error) => {
      console.error('Error checking product existence:', error);
    }
  );



    // this.http.post<any>('http://localhost:8090/api/v1/carts/add', newUserStock, httpOptions)
    //   .subscribe(
    //     (response) => {
    //       console.log('UserStock added successfully:', response);
    //     },
    //     (error) => {
    //       console.error('Error adding UserStock:', error);
    //       // Handle error here (e.g., show error message to the user)
    //     }
    //   );
  }
  
  getUserActuel(email:string){
    this.getUserByEmail(email)
    .subscribe(
      (user: User) => {
        this.userAct = user;
        // console.log('User:', this.userAct);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  getUserByEmail(email: string): Observable<User> {
    this.emailAct=email;
    return this.http.get<User>(`http://localhost:8090/api/v1/users/email/${email}`);
  }
}


