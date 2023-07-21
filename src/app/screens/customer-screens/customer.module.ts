import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { FaqComponent } from './faq/faq.component';
import { SharedModule } from '../../shared/shared.module';
import { FoodDetailsComponent } from './food-details/food-details.component';
@NgModule({
  declarations: [
    WelcomeComponent,
    MenuComponent,
    FaqComponent,
    FoodDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    WelcomeComponent,
    MenuComponent,
    FaqComponent,
    FoodDetailsComponent,
  ]
})
export class CustomerModule { }
