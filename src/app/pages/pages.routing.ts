import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManetimientoComponent } from './manetimiento/manetimiento.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
    {path: 'dashboard',
     component: PagesComponent,
     canActivate: [ AuthGuard ],
    children: [
        {path: '', component: DashboardComponent},
        {path: 'mantenimiento', component: ManetimientoComponent},
        {path: 'perfil', component: PerfilComponent},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  
    ]
    }
  
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }