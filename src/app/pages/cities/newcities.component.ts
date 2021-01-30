import { Component, OnInit, Input } from '@angular/core';
import { CityService } from '../../services/service.index';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newcities',
  templateUrl: './newcities.component.html',
  styles: []
})
export class NewcitiesComponent implements OnInit {

  @Input() citiesDetails = { fullName: '', cityUrl: '', location: {geohash:'',lat:'',lon:''} };
  constructor(
    public _cityService: CityService,
    public router: Router
  ) { }

  ngOnInit() {}

  addCity() {
    this._cityService.crearCities(this.citiesDetails )
      .subscribe( (resp: {}) => {
        this.router.navigate(['/listcities']);
  });
}

addOperator() {
  this._cityService.crearCities(this.citiesDetails)
  .subscribe((data: {}) => {
  this.router.navigate(['/listcities']);
});
}
}
