import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// ng2-charts
import { ChartsModule } from 'ng2-charts';

// pipes
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-Dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NewcitiesComponent } from './cities/newcities.component';
import { ListcitiesComponent } from './cities/listcities.component';
import { ListbusesComponent } from './buses/listbuses.component';
import { NewbusesComponent } from './buses/newbuses.component';
import { UpdabusesComponent } from './buses/updabuses.component';
import { EditcitiesComponent } from './cities/editcities.component';

// Angular Material
import {
   MatTableModule,
   MatPaginatorModule,
   MatSortModule,
   MatFormFieldModule,
   MatInputModule,
   MatButtonModule,
   MatDialogModule,
   MatIconModule,
   MatToolbarModule
 } from '@angular/material';
import { NewDepartComponent } from './departure/new-depart/new-depart.component';
import { ListDepartComponent } from './departure/list-depart/list-depart.component';
import { UpdaDepartComponent } from './departure/upda-depart/upda-depart.component';
import { DeletDepartComponent } from './departure/delet-depart/delet-depart.component';





@NgModule({
 declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccoutSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ListcitiesComponent,
    NewcitiesComponent,
    ListbusesComponent,
    NewbusesComponent,
    EditcitiesComponent,
    NewDepartComponent,
    ListDepartComponent,
    UpdaDepartComponent,
    DeletDepartComponent,
    UpdabusesComponent
 ],
 exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
 ],
 imports: [
    CommonModule,
 SharedModule,
 PAGES_ROUTES,
 FormsModule,
 ReactiveFormsModule,
 ChartsModule,
 PipesModule,
 MatTableModule,
 MatPaginatorModule,
 MatSortModule,
 MatFormFieldModule,
 MatInputModule,
 MatButtonModule,
 MatDialogModule,
 MatIconModule,
 MatToolbarModule
]
})

export class PageModule {}

