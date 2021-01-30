import { Component,  ViewChild, OnInit } from '@angular/core';
import { City } from '../../models/city.model';
import { CityService } from '../../services/service.index';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

declare var swal: any;

@Component({
  selector: 'app-listcities',
  templateUrl: './listcities.component.html',
  styleUrls: ['./cities.component.css']
})
export class ListcitiesComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['fullName', 'cityUrl', 'location.geohash', 'location.lat', 'location.lon', 'id'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  cities: City[] = [] ;
  desde: number = 0;
  cargando: boolean = true;

  constructor(
    public _cityService: CityService
  ) { }

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  ngOnInit() {

    this.displayedColumns = ['fullName', 'cityUrl', 'location.geohash', 'location.lat', 'location.lon', 'id'];
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.cities;

    this.cargarCities();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarCities() {
  this.cargando = true;
  this._cityService.cargarcities()
 .subscribe( cities => {
  // this.dataSource = new MatTableDataSource();
  this.dataSource.data = cities;
  this.cargando = false;
  console.log( cities );
 });
  }

}
