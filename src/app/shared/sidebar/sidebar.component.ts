import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;
  menuItems: any[];

  constructor(private sidebarService: SidebarService,
    usuarioService: UsuarioService
  ) {
    this.usuario = usuarioService.usuario;
    this.menuItems = this.sidebarService.menu;
  }
  ngOnInit(): void {
  }

}
