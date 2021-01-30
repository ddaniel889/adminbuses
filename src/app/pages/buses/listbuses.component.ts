import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Bus } from '../../models/bus.model';
import { BusService } from '../../services/service.index';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listbuses',
  templateUrl: './listbuses.component.html',
  styleUrls: ['./buses.component.css']
})
export class ListbusesComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = [ 'Modelo', 'Asientos Disponibles', 'Vin', 'Comodidades', 'Clase', 'id'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  buses: Bus[] = [] ;
  valores: any = [] ;
  vista: boolean;
  data = false;
  constructor(
    public _busService: BusService, private router: Router
  ) {}

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  ngOnInit() {
    this.displayedColumns = [ 'Modelo', 'Asientos Disponibles', 'Vin', 'Comodidades', 'Clase', 'id'];
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.buses;
    this.cargarBuses();
    this.dataSource.paginator = this.paginator;
    console.log(this.cargarBuses());
  }

  applyFilterapplyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buscarB(word: string) {
    this.router.navigate(['/buscar', word]);
    console.log(word);
  }
  cargarBuses() {
    this._busService.cargarbuses()
    .subscribe( buses => {
      this.dataSource.data = buses;
      this.buses = buses;
      if (!this.dataSource.data) {

        this.data = true;
       }

      }
    );

     }


  borrarBuses( bus: Bus ) {
      this._busService.borrarBus( bus.id )
              .subscribe( () =>  this.cargarBuses() );
    }

  // Delete Bus
  deleteBus(id) {
      this._busService.deleteBus(id).subscribe(data => {
       this.ngOnInit();

        },
        error => {
          console.log(error);
          this.vista = true;
          console.log(this.vista);
          Swal.fire('No se puede eliminar el Bus porque ya tiene una Salida registrada.');
        }
   );

      }
   }



