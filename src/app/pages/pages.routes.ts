import {RouterModule, Routes} from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
// import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NewcitiesComponent } from './cities/newcities.component';
import { ListcitiesComponent } from './cities/listcities.component';
import { NewbusesComponent } from './buses/newbuses.component';
import { ListbusesComponent } from './buses/listbuses.component';
import { EditcitiesComponent } from './cities/editcities.component';
import { ListDepartComponent } from './departure/list-depart/list-depart.component';
import { NewDepartComponent } from './departure/new-depart/new-depart.component';
import { UpdaDepartComponent } from './departure/upda-depart/upda-depart.component';
import { DeletDepartComponent } from './departure/delet-depart/delet-depart.component';
import { UpdabusesComponent } from './buses/updabuses.component';

const pagesRoutes: Routes = [
    { path: '', component: PagesComponent,
    // canActivate: [ LoginGuardGuard],
    children: [
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
        {path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'}},
        {path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas'} },
        {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
        {path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
        {path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del tema'} },
        {path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
        // Mantenimientos
        {path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuario'} },
        {path: 'newcities', component: NewcitiesComponent, data: { titulo: 'Insertar una nueva ciudad'} },
        {path: 'listcities', component: ListcitiesComponent, data: { titulo: 'Todas las ciudades'} },
        {path: 'updatecities', component: EditcitiesComponent, data: { titulo: 'Actualizar ciudades'} },
        {path: 'newbuses', component: NewbusesComponent, data: { titulo: 'Insertar buses'} },
        {path: 'listbuses', component: ListbusesComponent, data: { titulo: 'Ver buses'} },
        {path: 'updabuses/:id', component: UpdabusesComponent, data: { titulo: 'Actualizar buses'} }, /*updabuses/:id*/
        {path: 'list-depart', component: ListDepartComponent, data: { titulo: 'Ver salidas'} },
        {path: 'new-depart', component: NewDepartComponent, data: { titulo: 'Nuevas salidas'} },
        {path: 'upda-depart/:id', component: UpdaDepartComponent, data: { titulo: 'Actualizar salidas'} }, /*upda-depart/:id*/
        {path: 'buscar/:word', component: DeletDepartComponent, data: { titulo: 'Resultados'} },
        {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
}
];

export const PAGES_ROUTES = RouterModule.forChild ( pagesRoutes );
