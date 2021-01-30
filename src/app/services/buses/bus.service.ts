import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Bus } from '../../models/bus.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  bus: Bus [] = [];
  busServices = [];

 

  constructor(
    public http: HttpClient
  ) {
  /*  this.busServices = [
      {
        "id": "40448df1-1751-415d-9351-35254c1d67d6",
        "model": "Volvo Update",
        "availableSeats": 56,
        "seats": [
            "1:A:E:V,2:A:E:P,_,3:A:E:P,4:A:E:V,|,5:A:E:V,6:A:E:P,_,7:A:E:P,9:A:E:V"
        ],
        "class": "CONVENTIONAL",
        "operatorId": "fa1f40ab-e61a-3379-8cea-32cd9e1bc29e",
        "vin": "1GDJ7H1C81J590168Up",
        "amenities": [
            "WIFI",
            "TV"
        ]
    },
    {
        "id": "f090b29d-b511-4cd6-93e0-599a2c5f2083",
        "model": "Urquiza",
        "availableSeats": 30,
        "seats": [
            "1:A:E:V,2:A:E:P,_,3:A:E:P,4:A:E:V,|,5:A:E:V,6:A:E:P,_,7:A:E:P,8:A:E:V"
        ],
        "class": "LEITO",
        "operatorId": "fa1f40ab-e61a-3379-8cea-32cd9e1bc29e",
        "vin": "1GDJ7H1C81J590169",
        "amenities": [
            "RADIO"
        ]
    },
    {
        "id": "90f4406a-9079-4cc2-8cb3-8c0e5d1d440a",
        "model": "Urquiza2",
        "availableSeats": 20,
        "seats": [
            "1:A:E:V:|,2:A:E:V:|,3:A:E:V:|,4:A:E:V:|,5:A:E:V:|,6:A:E:V:|,7:A:E:V:|,8:A:E:V:|,9:A:E:V:|,10:A:E:V:|,11:A:E:V:|,12:A:E:V:|,13:A:E:V:|,14:A:E:V:|,15:A:E:V:|,16:A:E:V:|,17:A:E:V:|,18:A:E:V:|,19:A:E:V:|,20:A:E:V:|"
        ],
        "class": "CONVENTIONAL",
        "operatorId": "fa1f40ab-e61a-3379-8cea-32cd9e1bc29e",
        "vin": "1SD5SDS25SS",
        "amenities": [
            "TOILED"
        ]
    },
    {
        "id": "118484d3-1c40-49b8-a4a1-6a93cb623c9d",
        "model": "Bus5",
        "availableSeats": 20,
        "seats": [
            "1:A:E:V:|,2:A:E:V:|,3:A:E:V:|,4:A:E:V:|,5:A:E:V:|,6:A:E:V:|,7:A:E:V:|,8:A:E:V:|,9:A:E:V:|,10:A:E:V:|,11:A:E:V:|,12:A:E:V:|,13:A:E:V:|,14:A:E:V:|,15:A:E:V:|"
        ],
        "class": "CONVENTIONAL",
        "operatorId": "fa1f40ab-e61a-3379-8cea-32cd9e1bc29e",
        "vin": "1SD42522ASA52A",
        "amenities": [
            "WIFI",
            "TV",
            "FOOD",
            "RADIO"
        ]
    },
    {
        "id": "865a418b-8230-47bc-be1c-a5ea8ff215bb",
        "model": "Mercedes Benz ",
        "availableSeats": 20,
        "seats": [
            "1:A:E:V:|,2:A:E:V:|,3:A:E:V:|,4:A:E:V:|,5:A:E:V:|,6:A:E:V:|,7:A:E:V:|,8:A:E:V:|,9:A:E:V:|,10:A:E:V:|,11:A:E:V:|,12:A:E:V:|,13:A:E:V:|,14:A:E:V:|,15:A:E:V:|,16:A:E:V:|,17:A:E:V:|,18:A:E:V:|,19:A:E:V:|,20:A:E:V:|"
        ],
        "class": "SEMI_LEITO",
        "operatorId": "fa1f40ab-e61a-3379-8cea-32cd9e1bc29e",
        "vin": "1S6636SDSDSD",
        "amenities": [
            "RADIO"
        ]
    }

    ];*/
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/vnd.nidarbox.rapibuses.v1+json'
    })
  };
// Manejador de Errores
handleError(error): any {
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
//  obtener buses
cargarbuses(): Observable<any> {
  const url = URL_SERVICIOS + '/buses?operatorCode=BUS_AR';
  return this.http.get( url).pipe(
    map( (resp: any) => {
    return resp.content;
    } )
  );
}

findBus( word: string)  {
  const bus = [];
   /*respuesta de servicio*/
 /* this.Mybus = this.busService.cargarbuses();*/ /*.subscribe( buses => {
    this.busServices = buses;
    console.log(this.busServices);
    }
  );*/
  console.log('buses fuera de subscribe' + this.busServices);
  word = word.toLowerCase();
  for (const one of this.busServices) {
    const modelo = one.model.toLowerCase();
    if (modelo.indexOf(word) >= 0 ) {
       bus.push(one);
    }
  }
  return bus;
}




/*URL_SERVICIOS + '/buses?operatorCode=BUS_AR' */

// Nuevo bus

crearBuses(bus ): Observable<any> {

  const url = URL_SERVICIOS + '/buses';
  return this.http.post<any>( url, JSON.stringify(bus), this.httpOptions)
  .pipe(
  map( resp => {
    Swal.fire('El Bus ha sido agregado');
    return resp;
   })
  );

  }

  getBusesId(id: string) {
    const url = URL_SERVICIOS + '/buses/' + id;
    return this.http.get( url) .pipe(
      map( (resp: any) => {
      return resp;
      } )
    );
  }

  updateBuses(bus, id): Observable<any> {
    const url = URL_SERVICIOS + `/buses/${id}`;
    console.log(bus);
    return this.http.patch<any>( url, JSON.stringify(bus), this.httpOptions)
    .pipe(
      map( resp => {
        Swal.fire('El bus ha sido actualizado');
        return resp;
       })
      );
  }

  editBuses(id) {
    const url = URL_SERVICIOS + '/buses/' + id;
    return this
            .http
            .get(url).pipe(
              map( (resp: any) => {
              return resp.content;
              } )
            );
    }

  borrarBus( id: string ) {
    const url = URL_SERVICIOS + '/buses/' + id;
    return this.http.delete( url ).pipe(
      map( resp => {
       Swal.fire('El Bus fue borrado', 'success');
       return resp;
      })
    );
  }

  // HttpClient API delete() method => Delete Bus
deleteBus(id: string) {
  return this.http.delete<Bus>(URL_SERVICIOS + '/buses/' + id, this.httpOptions)
  .pipe(
    map( resp => {
      Swal.fire('El Bus fue borrado');
      return resp;
     })
  );
  }


}
