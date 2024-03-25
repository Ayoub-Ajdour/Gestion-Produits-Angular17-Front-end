import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoproductsdetailsComponent } from './promoproductsdetails.component';

describe('PromoproductsdetailsComponent', () => {
  let component: PromoproductsdetailsComponent;
  let fixture: ComponentFixture<PromoproductsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoproductsdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromoproductsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
