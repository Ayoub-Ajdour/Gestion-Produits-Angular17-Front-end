import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiotoudertComponent } from './biotoudert.component';

describe('BiotoudertComponent', () => {
  let component: BiotoudertComponent;
  let fixture: ComponentFixture<BiotoudertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiotoudertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiotoudertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
