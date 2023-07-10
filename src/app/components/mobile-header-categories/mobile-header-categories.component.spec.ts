import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileHeaderCategoriesComponent } from './mobile-header-categories.component';

describe('MobileHeaderCategoriesComponent', () => {
  let component: MobileHeaderCategoriesComponent;
  let fixture: ComponentFixture<MobileHeaderCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileHeaderCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileHeaderCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
