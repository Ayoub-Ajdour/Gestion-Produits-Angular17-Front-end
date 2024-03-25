import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoneyproductsComponent } from './honeyproducts.component';

describe('HoneyproductsComponent', () => {
  let component: HoneyproductsComponent;
  let fixture: ComponentFixture<HoneyproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoneyproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoneyproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
