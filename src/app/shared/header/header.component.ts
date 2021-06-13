import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public cliente: Cliente | undefined;

  constructor( private servicio: ClienteService ) {
    this.cliente = servicio.cliente;
   }

  ngOnInit(): void {
  }

  LogOut(){
    this.servicio.logout();
  }

}
