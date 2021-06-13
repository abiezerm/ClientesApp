import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManetimientoComponent } from '../manetimiento/manetimiento.component';
import { PagesComponent } from '../pages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ManetimientoComponent,
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ManetimientoComponent,
    PagesComponent,
    DashboardComponent,
  ]
})
export class PagesModule { }
