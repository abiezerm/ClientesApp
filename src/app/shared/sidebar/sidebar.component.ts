import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public cliente: Cliente | undefined;

  constructor( private servicio: ClienteService ) {
    this.cliente = servicio.cliente;
   }

  ngOnInit(): void {
  }

}
