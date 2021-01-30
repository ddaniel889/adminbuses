import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
 {
  titulo: 'Principal',
  icono: 'mdi mdi-gauge',
  submenu: [
    { titulo: 'Dashboard', url: '/dashboard' },
    { titulo: 'ProgressBar', url: '/progress' },
    { titulo: 'Graficas', url: '/graficas1' },
    { titulo: 'Promesas', url: '/promesas' },
    { titulo: 'Rxjs', url: '/rxjs' }

  ]
 },
 {
   titulo: 'Usuario',
   icono: 'mdi mdi-account',
   submenu: [
     { titulo: 'Ver usuarios', url: '/usuarios'},
     { titulo: 'Nuevo Usuario', url: '/hospitales'}
   ]
 },
 {
  titulo: 'Ciudades',
  icono: 'mdi mdi-city',
  submenu: [
    { titulo: 'Ver ciudades', url: '/listcities'},
    { titulo: 'Nueva ciudad', url: '/newcities'},
    { titulo: 'Modificar ciudad', url: '/updatecities'}
  ]
},
{
  titulo: 'Buses',
  icono: 'mdi mdi-bus',
  submenu: [
    { titulo: 'Ver Buses', url: '/listbuses'},
    { titulo: 'Nuevo Bus', url: '/newbuses'}
    /*{ titulo: 'Actualizar Bus', url: '/updabuses/:id'}*/ /*posible id */
  ]
},
{
  titulo: 'Salidas',
  icono: 'mdi mdi-bus',
  submenu: [
    { titulo: 'Ver Salidas', url: '/list-depart'},
    { titulo: 'Agregar Salida', url: '/new-depart'}
   /* { titulo: 'Editar Salida', url: '/upda-depart/:id'}/*, posible id */
    /*{ titulo: 'Eliminar Salida', url: '/delet-depart'}*/
  ]
}
  ];

  constructor() { }
}
