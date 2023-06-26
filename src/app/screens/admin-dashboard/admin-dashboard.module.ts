import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FoodMenuComponent } from './food-menu/food-menu.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FoodMenuComponent,
    AddFoodComponent,
    CategoryListComponent,
    AddCategoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class AdminDashboardModule { }
