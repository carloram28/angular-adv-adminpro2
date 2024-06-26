import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: { titulo: string, icono: string, submenu: { titulo: string, url: string }[] }[] = [];

  cargarMenu() {
    const menuData = localStorage.getItem('menu');

    this.menu = menuData ? JSON.parse(menuData) : [];
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'Graficas', url: 'grafica1' },
  //       { titulo: 'Rxjs', url: 'rxjs' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //     ]

  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Médicos', url: 'medicos' },

  //     ]

  //   }

  // ]


}
