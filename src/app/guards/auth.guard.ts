import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClienteService } from '../services/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private servicio: ClienteService, private router: Router ){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      return this.servicio.validarToken().pipe(
        tap( estaAutenticado => {
          if( !estaAutenticado ){
            this.router.navigateByUrl('./login');
          }
        })
      );
  }
  
}
