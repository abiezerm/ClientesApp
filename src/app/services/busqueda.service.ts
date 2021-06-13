import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarCliente } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor( private http: HttpClient ) { }


  get Token(): string{
    return localStorage.getItem('token') || '';
  }

  buscarCliente( termino: string){
    const url = `${base_url}/todo/coleccion/${ termino }`;

  return this.http.get<any[]>( url, {
    headers: {
      'x-token': this.Token
    }
  }).pipe(
    map( (resp: any) => resp.resultados )
  )
  }

}
