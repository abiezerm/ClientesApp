import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { CargarCliente } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public cliente: Cliente | undefined;

  // public cliente: Cliente;

  constructor( private http: HttpClient, private router: Router ) { 

  }

  
  get Token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.cliente?.uid || '';
  }

  validarToken(): Observable<boolean>{
    

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.Token
      }
    }).pipe(
      map( (resp: any) => {

        console.log( resp );
        const {email,password,nombre,direccion ,uid} = resp.cliente;

        this.cliente = new Cliente(nombre, email, password, direccion, uid);
        this.cliente.imprimirUsuario();

        localStorage.setItem('token',resp.token)
        return true;
      }),
      catchError( error => of(false) )
    )
  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/clientes`, formData);
  }

  login( formData: LoginForm){
    return this.http.post(`${ base_url}/login`,formData)
                    .pipe(
                      tap( (resp: any) => {
                        localStorage.setItem('token',resp.token)
                      })
                    );
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }


  actualizarUsuario( data: {email: string, nombre: string}){
    return this.http.put(`${ base_url }/clientes/${ this.uid }`, data, {
      headers: {
        'x-token': this.Token
      }
    });
  }


cargarUsuarios(desde: number = 0){

  const url = `${base_url}/clientes?desde=${desde}`;

  return this.http.get<CargarCliente>( url, {
    headers: {
      'x-token': this.Token
    }
  } )
}

eliminarUsuario( cliente: Cliente ){
  return this.http.delete(`${base_url}/clientes/${ cliente.uid }`, {
    headers: {
      'x-token': this.Token
    }
  })
}



}
