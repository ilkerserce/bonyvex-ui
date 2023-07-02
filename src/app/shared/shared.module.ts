import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from '../components/navigation/navigation.component';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { BoxComponent } from '../components/box/box.component';

import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardLayoutComponent,
    BoxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule
  ],
  exports: [
    NavigationComponent,
    DashboardLayoutComponent,
    BoxComponent,
    MatCheckboxModule
  ]
})
export class SharedModule { }
