import { Component, OnInit } from '@angular/core';
import { CargarCliente } from 'src/app/interfaces/cargar-usuarios.interface';
import { Cliente } from 'src/app/models/cliente.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manetimiento',
  templateUrl: './manetimiento.component.html',
  styles: [
  ]
})
export class ManetimientoComponent implements OnInit {

  public totalClientes: number = 0;
  public clientes: Cliente[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private servicio: ClienteService, private busqueda: BusquedaService ) { }

  ngOnInit(): void {
   this.cargarUsuario();
  }

  cargarUsuario(){
    this.cargando = true;
    this.servicio.cargarUsuarios(this.desde).subscribe( resp => {
      console.log(resp)
      this.totalClientes = resp.totalClientes;
      this.clientes = resp.clientes;
      this.cargando = false;
      
    })
  }

  cambiarPagina( valor: number ){
    this.desde += valor;

    if( this.desde < 0){
      this.desde = 0
    }else if( this.desde > this.totalClientes ){
      this.desde -= valor;
    }

    this.cargarUsuario();
  }

  buscar( termino: string ){
    this.busqueda.buscarCliente( termino ).subscribe(  resp => {
      this.clientes = resp
    })

  }


  eliminarCliente(cliente: Cliente){
    Swal.fire({
      title: 'Estas seguro?',
      text: `Estas a punto de borrar a ${ cliente.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicio.eliminarUsuario( cliente ).subscribe( resp => {
          this.cargarUsuario();
          Swal.fire(
            'Borrado!',
            `Se elimino a ${cliente.nombre}.`,
            'success'
          )
        })

      
      }
    })
  }

}
