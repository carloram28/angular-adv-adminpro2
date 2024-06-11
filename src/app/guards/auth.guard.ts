import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log("Pasó por el guard");
  const authService = inject(UsuarioService);
  const router = inject(Router);

  return authService.validarToken()
    .pipe(
      tap(
        (isAuth: boolean) => {

          console.log("Autorizado: ", isAuth);

          if (!isAuth) {

            router.navigateByUrl('/login');

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Sesión Cerrada",
              showConfirmButton: false,
              timer: 1500
            });
          };
        }
      )
    );
}
