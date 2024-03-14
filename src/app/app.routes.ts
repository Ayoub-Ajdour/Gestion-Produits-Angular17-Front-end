import { Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component'
import {CustomersComponent} from './customers/customers.component'
import { AppComponent } from './app.component';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { AuthenticationGuard } from './services/authentication-guard.service';

export const routes: Routes = [
  {
    path: 'accueil',
    component: AppComponent, // Replace with the actual component for your app
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'customers', component: CustomersComponent }
    ]
  },
  { path: 'login', component: AuthComponentComponent },
  { path: '', component: AuthComponentComponent }
];
