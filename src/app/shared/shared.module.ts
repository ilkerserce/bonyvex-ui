import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from '../components/navigation/navigation.component';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { BoxComponent } from '../components/box/box.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardLayoutComponent,
    BoxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    NavigationComponent,
    DashboardLayoutComponent,
    BoxComponent,
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule { }
