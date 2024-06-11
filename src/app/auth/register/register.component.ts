import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm: FormGroup = this.fb.group({
    nombre: ['Fernando', Validators.required],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/')


      }, (err) => {
        //Si sucede un error
        Swal.fire('Error', err.error.msg, 'error')
      });

  }
  campoNoValido(campo: string): boolean {
    const campoControl = this.registerForm.get(campo);

    if (campoControl) {
      return campoControl.invalid && this.formSubmitted;
    }

    return false;
  }

  contrasenasNoValidas() {
    const pass1Control = this.registerForm.get('password');
    const pass2Control = this.registerForm.get('password2');

    if (pass1Control && pass2Control) {
      const pass1 = pass1Control.value;
      const pass2 = pass2Control.value;

      if (pass1 !== pass2 && this.formSubmitted) {
        return true;
      }
    }

    return false;
  }

  aceptaTerminos() {
    const terminosControl = this.registerForm.get('terminos');

    if (terminosControl) {
      return !terminosControl.value && this.formSubmitted;
    }

    return false;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control && pass2Control) {
        if (pass1Control.value === pass2Control.value) {
          pass2Control.setErrors(null);
        } else {
          pass2Control.setErrors({ noEsIgual: true });
        }
      }
    };
  }

}

