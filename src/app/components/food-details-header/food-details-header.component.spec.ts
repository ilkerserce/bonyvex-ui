import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDetailsHeaderComponent } from './food-details-header.component';

describe('FoodDetailsHeaderComponent', () => {
  let component: FoodDetailsHeaderComponent;
  let fixture: ComponentFixture<FoodDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDetailsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
