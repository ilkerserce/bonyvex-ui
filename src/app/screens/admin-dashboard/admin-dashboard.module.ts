import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FoodMenuComponent } from './food-menu/food-menu.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqAddUpdateComponent } from './faq-add-update/faq-add-update.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    FoodMenuComponent,
    AddFoodComponent,
    CategoryListComponent,
    AddCategoryComponent,
    FaqListComponent,
    FaqAddUpdateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminDashboardModule { }