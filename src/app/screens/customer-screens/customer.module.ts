import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { FaqComponent } from './faq/faq.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    WelcomeComponent,
    MenuComponent,
    FaqComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    WelcomeComponent,
    MenuComponent,
    FaqComponent,
  ]
})
export class CustomerModule { }
