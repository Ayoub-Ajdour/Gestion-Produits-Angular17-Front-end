import { Injectable} from '@angular/core';
import { product } from '../products/product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products!:Array<any>;
  private apiUrl = 'http://localhost:8090/api/v1/products'; 

  
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
    // return of(this.products);
    
    return this.http.get<any[]>('http://localhost:8090/api/v1/products');
   }

   public deleteProduct(id:number):Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
   }
   public buying(p:product):Observable<boolean>{
    this.addtoCart(p);
    --p.quantity;
    return of(true)
   }
   addtoCart(p:product) {
    console.log(p.name+' added to ur cart');
    // if()
  }
}


