import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formLoginSubmitted: boolean = false;
  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });
  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) { }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.googleAuthInit();
  }


  googleAuthInit() {
    this.usuarioService.googleInit().then((response) => {
      this.handleCredentialResponse(response);
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    // console.log("Encoded JWT ID token" + response.credential);
    this.usuarioService.loginGoogle(response.credential)
      .subscribe({

        next: (resp) => {

          // Navegamos al dashboard!
          this.ngZone.run(() => {
            this.router.navigateByUrl('/')

          })
          // Inicio de sesion exitoso alerta

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Iniciaste Sesión",
            showConfirmButton: false,
            timer: 1500
          });

        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },

      });


  }

  login() {
    this.formLoginSubmitted = true;
    console.log(this.loginForm.value);

    this.usuarioService.login(this.loginForm.value).subscribe({
      next: (resp) => {

        if (this.loginForm.get('remember')!.value) {
          localStorage.setItem('email', this.loginForm.get('email')!.value);
        } else {
          localStorage.removeItem('email');
        };

        console.log("Sesion iniciada: ", resp);

        this.ngZone.run(() => {
          this.router.navigateByUrl('/')

        })

        // Inicio de sesion exitoso Alerta
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡Binvenido!",
          showConfirmButton: false,
          timer: 1500
        });

      },
      error: (error: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.msj,
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    });
  };

}
