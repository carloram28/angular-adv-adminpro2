import { ModalImagenService } from './../../../services/modal-imagen.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { MedicoService } from '../../../services/medico.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = []
  public cargando: boolean = true;
  private imgSubs!: Subscription;

  constructor(private busquedasService: BusquedasService,
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe((medicos) => {
        this.cargando = false;
        this.medicos = medicos;

      })

  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos', termino)
      .subscribe({
        next: (resultado: any) => {
          this.medicos = resultado;
        }
      })

    return;
  }

  abrirModal(medico: Medico) {

    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);

  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.medicoService.borrarMedico(medico._id!)
          .subscribe(resp => {

            this.cargarMedicos();
            Swal.fire(
              'Médico borrado',
              `${medico.nombre} fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }


}
