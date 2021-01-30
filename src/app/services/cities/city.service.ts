import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { City } from '../../models/city.model';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class CityService {
city: City [] = [];

  constructor(
    public http: HttpClient
  ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/vnd.nidarbox.rapibuses.v1+json',
      'X-Authorization': ''
    })
  };


// Manejador de Errores
handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}


// Nueva ciudad
crearCities( city): Observable<City> {
  const url = URL_SERVICIOS + '/cities/';
  return this.http.post<City>( url, JSON.stringify(city), this.httpOptions)
  .pipe(
  retry(1),
  catchError(this.handleError)
  );

  }

  actualizarCity( id, city: City): Observable<City> {
    const url = URL_SERVICIOS + '/cities/'  + id;
    return this.http.patch<City>( url, JSON.stringify(city), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
      );
   }

   getCities(id): Observable<City> {
    const url = URL_SERVICIOS + '/cities/' + id;
    return this.http.get<City>( url)
    .pipe(
      retry(1),
      catchError(this.handleError)
      );
   }

   obtenerCiudad( id: string ) {
    const url = URL_SERVICIOS + '/cities/' + id;
    return this.http.get ( url ) .pipe(
      map((resp: any) => resp.content )
    );
  }

  cargarcities() {
    const url = URL_SERVICIOS + '/cities';
    return this.http.get( url) .pipe(
      map( (resp: any) => {
      return resp.content;
      } )
    );
  }


  crearCities_old( city: City ) {
    const url = URL_SERVICIOS + '/cities';
    return this.http.post( url, city)
    .pipe(
     map( (resp: any ) => {
      Swal.fire('ciudad creada', city.fullName, 'success');
      return resp.city;
     }  )
    );
  }


   borrarCities( id: string ) {
    const url = URL_SERVICIOS + '/cities/' + id;
    return this.http.delete( url ) .pipe(
      map( resp => Swal.fire('Ciudad borrada', 'success')
       )
    );
  }

}
