import { Component, OnInit, ViewChild  } from '@angular/core';
import { DepartureService } from '../../../services/departure.service';
import Swal from 'sweetalert2';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-list-depart',
  templateUrl: './list-depart.component.html',
  styleUrls: ['./list-depart.component.css']
})
export class ListDepartComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = [ 'Zona Horaria', 'Hora de Salida', 'Hora de Llegada', 'Origen', 'Destino', 'Bus', 'id'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  departure: any = [];
  data = false;
  constructor(public departureService: DepartureService) {
  }

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  ngOnInit() {
    this.displayedColumns = [ 'Zona Horaria', 'Hora de Salida', 'Hora de Llegada', 'Origen', 'Destino', 'Bus', 'id'];
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.departure;
    this.load();
    this.dataSource.paginator = this.paginator;
    console.log(this.load());
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  load() {
    this.departureService.loadDeparture()
    .subscribe( departure => {
      this.dataSource.data = departure;
      if (!this.dataSource.data) {

        this.data = true;
       }
    } );
    console.log(this.departure);
     }

     deleteBus(id) {
       Swal.fire({
         title: '¿Está seguro de borrar el registro?',
         showConfirmButton: true,
         showCancelButton: true,


       }).then( resp => {
          if (resp.value) {
            this.departureService.deleteDeparture(id).subscribe(data => {
              this.ngOnInit();
            });
          }
       });
     }

}
