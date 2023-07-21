import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // ReactiveFormsModule'ı içe aktarın

import { NavigationComponent } from '../components/navigation/navigation.component';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { BoxComponent } from '../components/box/box.component';
import { SubHeaderComponent } from '../components/sub-header/sub-header.component';
import { FoodDetailsHeaderComponent } from '../components/food-details-header/food-details-header.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrandingComponent } from '../components/branding/branding.component';
import { MobileNavbarComponent } from '../components/mobile-navbar/mobile-navbar.component';
import { MobileHeaderCategoriesComponent } from '../components/mobile-header-categories/mobile-header-categories.component';
import { MenuContentComponent } from '../components/menu-content/menu-content.component';

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardLayoutComponent,
    BoxComponent,
    SubHeaderComponent,
    BrandingComponent,
    MobileNavbarComponent,
    MobileHeaderCategoriesComponent,
    MenuContentComponent,
    FoodDetailsHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavigationComponent,
    DashboardLayoutComponent,
    BoxComponent,
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    SubHeaderComponent,
    BrandingComponent,
    MobileNavbarComponent,
    MobileHeaderCategoriesComponent,
    MenuContentComponent,
    FoodDetailsHeaderComponent,
  ]
})
export class SharedModule { }
