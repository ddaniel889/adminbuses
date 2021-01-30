import { Component,  Inject, OnInit } from '@angular/core';
import { City } from '../../models/city.model';
import { CityService } from '../../services/service.index';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editcities',
  templateUrl: './editcities.component.html',
  styles: []
})
export class EditcitiesComponent implements OnInit {

  id = this.actRoute.snapshot.params.id;
  citiesDetails: any = {};

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['fullName', 'cityUrl', 'location.geohash', 'location.lat', 'location.lon', 'id'];


  cities: City[] = [] ;

  constructor(
    public _cityService: CityService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public dialogRef: MatDialogRef<EditcitiesComponent>,
  )   { }

// Form Validation
formControl = new FormControl('', [
  Validators.required
  // Validators.email,
]);

getErrorMessage() {
  return this.formControl.hasError('required') ? 'Required field' :
    this.formControl.hasError('email') ? 'Not a valid email' :
      '';
}

submit() {
  // emppty stuff
}

onNoClick(): void {
  this.dialogRef.close();
}
  ngOnInit() {
     this._cityService.getCities(this.id)
     .subscribe((data: {}) => {
    this.citiesDetails = data;
    console.log('id=' + this.id);
  });

  }

// UpdateCities
    updateCities() {
      if (window.confirm('¿Estás seguro, quieres actualizar?')) {
        this._cityService.actualizarCity(this.id, this.citiesDetails)
  .subscribe( data => {
    this.router.navigate(['/listcities']);
  });
}
}
}
