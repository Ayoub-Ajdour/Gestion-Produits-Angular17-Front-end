import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet ,RouterModule} from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  static raqm(arg0: number) {
    throw new Error('Method not implemented.');
  }
  title = 'BioToudert';
  private _raqm: number=0;
  public get raqm(): number {
    return this._raqm;
  }
  public set raqm(value: number) {
    this._raqm = value;
  }
}
