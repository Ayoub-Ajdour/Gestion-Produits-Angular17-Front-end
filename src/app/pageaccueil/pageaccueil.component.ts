import { AfterViewInit, Component,CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ProductsComponentns } from '../products nes/productsns.component';
@Component({
  selector: 'app-pageaccueil',
  standalone: true,
  imports: [ProductsComponentns],
  templateUrl: './pageaccueil.component.html',
  styleUrl: './pageaccueil.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class PageaccueilComponent implements AfterViewInit {
  @ViewChild('productsSection') productsSection!: ElementRef;

  ngAfterViewInit() {
  }

  scrollToProducts(): void {
    if (this.productsSection) {
      this.productsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
