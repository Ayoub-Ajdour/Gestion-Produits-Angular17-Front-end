import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../model/userApp.model';

@Component({
  selector: 'app-usersdetails',
  standalone: true,
  imports: [],
  templateUrl: './usersdetails.component.html',
  styleUrl: './usersdetails.component.css'
})
export class UsersdetailsComponent {

  @Input() u :User | undefined;
  @Output() deletingso = new EventEmitter();
  deleteuser(){
    console.log("deleted 1 👌");
    this.deletingso.emit();
  }
}
