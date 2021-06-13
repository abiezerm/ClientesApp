import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManetimientoComponent } from './pages/manetimiento/manetimiento.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [

  {path: '**', component: NopagefoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule, AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
