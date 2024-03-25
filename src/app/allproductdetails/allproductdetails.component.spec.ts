import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllproductdetailsComponent } from './allproductdetails.component';

describe('AllproductdetailsComponent', () => {
  let component: AllproductdetailsComponent;
  let fixture: ComponentFixture<AllproductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllproductdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllproductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
