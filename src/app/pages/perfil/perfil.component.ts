import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {

  public perfilform!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilform = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilform.value)
      .subscribe({
        next: (resp: any) => {
          const { nombre, email } = this.perfilform.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');

        },
        error: (err: any) => {

          Swal.fire('Error', err.error.msg, 'error');
        },
      });

  }
  cambiarImagen(event: any): void | null {
    const file = event.target.files[0];
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;

    }

  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img
        Swal.fire('Guardado', 'Imagen de Usuario Actualizada', 'success')
      }).catch(err => {
        console.log(err);

        Swal.fire('Error', 'No se pudo subir la imagen', 'error');

      })

  }


}
