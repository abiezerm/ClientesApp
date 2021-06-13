import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: any;
  public cliente: Cliente | undefined;

  constructor( private fb: FormBuilder, private servicio: ClienteService ) {

    this.cliente = servicio.cliente;
  
   }

  ngOnInit(): void {
    this.perfilForm =  this.fb.group({
      nombre: [this.cliente?.nombre,Validators.required],
      email: [this.cliente?.email,[Validators.required, Validators.email]]
    });
  }


  actualizarPerfil(){
    this.servicio.actualizarUsuario( this.perfilForm.value ).subscribe( resp => {
      const { nombre, email } = this.perfilForm.value;
      Swal.fire('Excelente','Se actualizo el usuario correctamente','success')
    })
  }

}
