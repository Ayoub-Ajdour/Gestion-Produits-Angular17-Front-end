import { Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component'
import {CustomersComponent} from './customers/customers.component'
import { AppComponent } from './app.component';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { AuthenticationGuard } from './services/authentication-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { FavoriteproductsComponent } from './favoriteproducts/favoriteproducts.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UsersComponent } from './users/users.component';
import { BiotoudertComponent } from './biotoudert/biotoudert.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { NaturalproductsComponent } from './naturalproducts/naturalproducts.component';
import { HoneyproductsComponent } from './honeyproducts/honeyproducts.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { PageaccueilComponent } from './pageaccueil/pageaccueil.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { BasketComponent } from './basket/basket.component';

export const routes: Routes = [
  {
    path: 'accueil',
    component: AppComponent, 
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'pageaccueil', component: PageaccueilComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'allproducts', component: AllproductsComponent },
      { path: 'favoriteproducts', component: FavoriteproductsComponent },
      { path: 'addproduct', component: AddproductComponent },
      { path: 'users', component: UsersComponent },
      { path: 'biotoudert', component: BiotoudertComponent },
      {  path: 'updateproduct/:productId', component: UpdateproductComponent },
      {path:'naturalproducts',component:NaturalproductsComponent},
      {path:'honeyproducts',component:HoneyproductsComponent},
      {path:'productpage',component:ProductPageComponent},
      {path:'basket',component:BasketComponent}   

         
      
    ]
  },
  { path: 'login', component: AuthComponentComponent },
  { path: '', component: AuthComponentComponent , pathMatch: 'full'},
  // { path: '', component: ProductsComponent , pathMatch: 'full'},

  { path: 'forgetpassword', component: ForgetpasswordComponent },
];
