import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['',Validators.required],
    direccion: ['',Validators.required],
    terminos: [false,Validators.required]
  })

  constructor( private fb: FormBuilder, private servicio: ClienteService ) { }

  ngOnInit(): void {
  }



  crearUsuario(){
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if( this.registerForm.invalid ){
      return;
    }

    // realizar posteo

    this.servicio.crearUsuario( this.registerForm.value ).subscribe(
      resp => {
        console.log( resp );
        Swal.fire('Excelente','Usuarios creado correctamente','success');
      },
      (err) => { 
        Swal.fire('Error','No se pudo crear el usuario', 'error');
        console.warn( err );
       }
    )

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  campoNoValido( campo: string ): boolean{

    if( this.registerForm.get(campo)?.invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }

  }


}
