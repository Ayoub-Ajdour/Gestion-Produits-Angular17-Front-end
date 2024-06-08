import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponentns} from './productsns.component'

describe('ProductsComponent', () => {
  let component: ProductsComponentns;
  let fixture: ComponentFixture<ProductsComponentns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponentns]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsComponentns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
