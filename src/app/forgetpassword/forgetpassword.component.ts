import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
error: any;
passwordVisible: any;
async up() {
  try {
    const email = this.form.get('email')?.value;
    if (email) {
      await this.auth.forgetPassword(email);
      console.log('Password reset email sent successfully.');
      // Alert for success
      alert('Password reset email sent successfully.');
      // Redirect to '#'
      this.router.navigate(['/']);
    } else {
      console.error('Email is required.');
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
    // Optionally, you can handle the error here, like displaying an error message to the user
  }
}
form!: FormGroup;
constructor(private fb:FormBuilder,private auth: AuthService,private router: Router){}
ngOnInit(): void {
  this.form=this.fb.group({
    email:['',Validators.required],
  });}
}
