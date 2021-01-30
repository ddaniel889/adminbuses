import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import { Bus } from '../models/bus.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DepartureService {
  departure: any = [];
  constructor( public http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/vnd.nidarbox.rapibuses.v1+json'
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

//  get Salida
loadDeparture() {
  const url = URL_SERVICIOS + '/departures?operatorCode=BUS_AR'; /*http://209.97.145.4:8080/api/departures?operatorCode=BUS_AR*/
  return this.http.get( url) .pipe(
    map( (resp: any) => {
    return resp.content;
    } )
  );
}

cargarbuses() {
  const url = URL_SERVICIOS + '/buses?operatorCode=BUS_AR';
  return this.http.get( url) .pipe(
    map( (resp: any) => {
    return resp.content;
    } )
  );
}

getCity() {
  const url = URL_SERVICIOS + '/cities';
  return this.http.get( url) .pipe(
    map( (resp: any) => {
    return resp.content;
    } )
  );
}

getDepartureId(id: string) {
  const url = URL_SERVICIOS + '/departures/' + id;
  return this.http.get( url) .pipe(
    map( (resp: any) => {
    return resp;
    } )
  );
}


// post Salida
createDeparture( a): Observable<any> {
  const url = URL_SERVICIOS + '/departures';
  return this.http.post<any>( url, JSON.stringify(a), this.httpOptions)
  .pipe(
  map( resp => {
    Swal.fire('La salida ha sido registrada');
    return resp;
   })
  );

  }

 updateDeparture(data, id): Observable<any> {
  const url = URL_SERVICIOS + '/departures/' + id;
  return this.http.patch<any>( url, JSON.stringify(data), this.httpOptions)
  .pipe(
    map( resp => {
      Swal.fire('La salida ha sido actualizada');
      return resp;
     })
    );
  }

  deleteDeparture(id: string) {
    return this.http.delete(URL_SERVICIOS + '/departures/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
    }


}

