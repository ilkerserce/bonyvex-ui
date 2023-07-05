import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AddCategoryComponent } from './screens/admin-dashboard/add-category/add-category.component';
import { AddFoodComponent } from './screens/admin-dashboard/add-food/add-food.component';
import { CategoryListComponent } from './screens/admin-dashboard/category-list/category-list.component';
import { FoodMenuComponent } from './screens/admin-dashboard/food-menu/food-menu.component';
import { LoginComponent } from './screens/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: DashboardLayoutComponent,
    children: [
      { path: 'foods', component: FoodMenuComponent },
      { path: 'foods/add', component: AddFoodComponent },
      { path: 'foods/edit/:id', component: AddFoodComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/add', component: AddCategoryComponent },
      { path: 'categories/edit/:id', component: AddCategoryComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
