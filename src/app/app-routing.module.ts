import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AddCategoryComponent } from './screens/admin-dashboard/add-category/add-category.component';
import { AddFoodComponent } from './screens/admin-dashboard/add-food/add-food.component';
import { CategoryListComponent } from './screens/admin-dashboard/category-list/category-list.component';
import { FaqAddUpdateComponent } from './screens/admin-dashboard/faq-add-update/faq-add-update.component';
import { FaqListComponent } from './screens/admin-dashboard/faq-list/faq-list.component';
import { FoodMenuComponent } from './screens/admin-dashboard/food-menu/food-menu.component';
import { FaqComponent } from './screens/customer-screens/faq/faq.component';
import { MenuComponent } from './screens/customer-screens/menu/menu.component';
import { WelcomeComponent } from './screens/customer-screens/welcome/welcome.component';
import { LoginComponent } from './screens/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'admin', component: DashboardLayoutComponent,
    children: [
      { path: 'foods', component: FoodMenuComponent },
      { path: 'foods/add', component: AddFoodComponent },
      { path: 'foods/edit/:id', component: AddFoodComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/add', component: AddCategoryComponent },
      { path: 'categories/edit/:id', component: AddCategoryComponent },
      { path: 'faqs', component: FaqListComponent },
      { path: 'faqs/add', component: FaqAddUpdateComponent },
      { path: 'faqs/edit/:id', component: FaqAddUpdateComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
