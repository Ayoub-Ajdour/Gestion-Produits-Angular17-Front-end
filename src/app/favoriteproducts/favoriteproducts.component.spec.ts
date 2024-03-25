import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteproductsComponent } from './favoriteproducts.component';

describe('FavoriteproductsComponent', () => {
  let component: FavoriteproductsComponent;
  let fixture: ComponentFixture<FavoriteproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
