import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { AuthComponentComponent } from '../auth-component/auth-component.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-firstinterface',
  standalone: true,
  imports: [AppComponent,AuthComponentComponent,CommonModule,RouterOutlet],
  templateUrl: './firstinterface.component.html',
  styleUrl: './firstinterface.component.css'
})
export class FirstinterfaceComponent {
  showSignInForm = true;

signUp() {
throw new Error('Method not implemented.');
}
signIn() {
throw new Error('Method not implemented.');
}
showSignUp() {
  this.showSignInForm = false;
}

showSignIn() {
  this.showSignInForm = true;
}
onSubmit() {
throw new Error('Method not implemented.');
}

}
