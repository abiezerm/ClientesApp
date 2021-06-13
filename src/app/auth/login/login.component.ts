import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [localStorage.getItem('check') || false]
  });


  constructor(private fb: FormBuilder, private servicio: ClienteService,private router: Router) { }

  ngOnInit(): void {
  }

  Login(){
    this.servicio.login( this.loginForm.value )
    .subscribe( resp => {
      console.log( this.loginForm.value );
      if( this.loginForm.get('remember')?.value ){
        localStorage.setItem('email', this.loginForm.get('email')?.value);
        localStorage.setItem('check', this.loginForm.get('remember')?.value);
      }else{
        localStorage.removeItem('email');
        localStorage.removeItem('check');
      }

      this.router.navigateByUrl('/dashboard')

    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error')
    })
  }

}
