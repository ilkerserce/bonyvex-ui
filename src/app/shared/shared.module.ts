import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from '../components/navigation/navigation.component';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { BoxComponent } from '../components/box/box.component';

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardLayoutComponent,
    BoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavigationComponent,
    DashboardLayoutComponent,
    BoxComponent
  ]
})
export class SharedModule { }
