import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalproductsComponent } from './naturalproducts.component';

describe('NaturalproductsComponent', () => {
  let component: NaturalproductsComponent;
  let fixture: ComponentFixture<NaturalproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaturalproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaturalproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
