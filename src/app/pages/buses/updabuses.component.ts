import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from '../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from '../../models/bus.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updabuses',
  templateUrl: './updabuses.component.html',
  styleUrls: ['./updabuses.component.css']
})
export class UpdabusesComponent implements OnInit {
 submitted = false;
  modelo: any;
  clase: any;
  soa: any;
  amenities: any;
  a: any;
  id: any;
  availableSeats: any;
  public form: FormGroup;
  buses: Bus[] = [] ;
  reserved2a3 = [];
  selected2a3 = [];
  selected = [];
  next = false;
  /*reserved: string[] = ['B2', 'D2', 'C3', 'E1', 'A1', 'D1', 'E2']; */
  reserved: string[] = ['1:B:E:V:|', '6:B:E:V:|', '10:B:E:V:|', '15:B:E:V:|'];
  services: string[];
  cols = [ 1 , 2, 3, 4];
  rows = [];
  seats = [];
  limit: any;


  constructor(public busService: BusService, public formBuilder: FormBuilder, private  actRoute: ActivatedRoute, private router: Router) {
    this.rows = ['A', 'B', 'C', 'D', 'E'];

   }



  ngOnInit() {
   this.update();
   this.id = this.actRoute.snapshot.paramMap.get('id');
   console.log(this.id);
   this.getBus(this.id);
   let my = this.form.value.aSeats;
   console.log('valor de ');
   console.log(my);
   this.form = this.formBuilder.group({
    modelo: ['', Validators.compose([Validators.required])],
    availableSeats: ['', Validators.compose([Validators.required])],
    clase: ['', Validators.compose([Validators.required])],
    vin: ['', Validators.compose([Validators.required])],
    amenities: ['', Validators.compose([Validators.required])],
    aSeats: ['', Validators.compose([Validators.required])],
    modify: ['', Validators.compose([Validators.required])]
    });
   console.log(this.form.value);
   console.log('valor del campo aSeats');
   console.log(this.form.value.aSeats);
   this.reserved = this.form.value.aSeats.toString();
   console.log('valor de reservado');
   console.log(this.reserved);

}


getBus(id) {
  this.busService.getBusesId(id).subscribe(data => {
    console.log('valor de data');
    console.log(data);
    this.form.setValue({
      modelo: data.model,
      availableSeats: data.availableSeats,
      clase: data.class,
      vin: data.vin,
      amenities: data.amenities,
      aSeats: data.seats,
      modify: 0
    });
    console.log('valor de data seats');
    console.log(data.seats);
    console.log('valor de data con string' + data.seats.toString() );
    let strS = data.seats.toString();
    console.log('length string');
    console.log(strS.length);
    this.services = this.form.value.aSeats;
    console.log('longitud' + this.services.length);
    let myString = this.form.value.aSeats.toString();
    console.log(myString);
  });
}

update() {
  this.form = this.formBuilder.group({
    modelo: ['', Validators.compose([Validators.required])],
    availableSeats: ['', Validators.compose([Validators.required])],
    clase: ['', Validators.compose([Validators.required])],
    soa: ['', Validators.compose([Validators.required])],
    amenities: ['', Validators.compose([Validators.required])],
    aSeats: ['', Validators.compose([Validators.required])],
    modify: ['', Validators.compose([Validators.required])]
    });
}


onSubmit() {
  console.log(this.form.value);
  this.submitted = true;
  console.log('valor de aseats' + this.form.value.aSeats);
  this.id = this.actRoute.snapshot.paramMap.get('id');
  const operator = 'fa1f40ab-e61a-3379-8cea-32cd9e1bc29e';
  const objectBus = {
  model: this.form.value.modelo.toString(),
  availableSeats: parseInt(this.limit),
  seats: [
    this.form.value.aSeats.toString()
  ],
  class: this.form.value.clase.toString(),
  operatorId: operator.toString(),
  vin: this.form.value.vin.toString(),
  amenities: [
    this.form.value.amenities
  ]
};
  console.log('valor de objectBus' + objectBus);
  const myObject = JSON.stringify(objectBus);
  console.log(myObject);
  this.busService.updateBuses(objectBus, this.id)
        .subscribe(res => {
         console.log(res);
         this.router.navigateByUrl('/listbuses');
         console.log('Content updated successfully!');
        }, (error) => {
          Swal.fire('Debe indicar sólo una opción para Comodidades.');
          console.log(error);
        });
}

getStatus = function(seatPos: string) {
  if (this.reserved.indexOf(seatPos) !== -1) {
      return 'reserved';
  } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
  }
};

getStatus2 = function(seatPos: string) {
  if (this.reserved2a3.indexOf(seatPos) !== -1) {
      return 'reserved';
  } else if (this.selected2a3.indexOf(seatPos) !== -1) {
      return 'selected';
  }
};

nextStep() {
  this.next = true;
  const limit = this.form.value.availableSeats;
  for (let i = 0; i < limit; i++) {
    this.seats.push(i);
   }
 }

 fill() {
  this.next = false;
  this.seats = [];
  this.limit = this.form.value.modify;
  console.log(this.limit);
  for (let i = 0; i < this.limit; i++) {
    this.seats.push(i +':' +'A' +':' +'E' +':' +'V' +':' +'|');
   }
  this.next = true;
  console.log(this.seats);
 }

seatClicked = function(seatPos: string) {
  /* cadena*/
  const index = this.selected.indexOf(seatPos);
  if (index !== -1) {
      // seat already selected, remove
      this.selected.splice(index, 1);
  } else {
      /*push to selected array only if it is not reserved*/
      if (this.reserved.indexOf(seatPos) === -1) {
          /*let b = 'B';
          let e = 'E';
          let v = 'V';
          let data = ':' + b + ' : ' + e + ': ' + v;*/
          this.selected.push(seatPos /* + data*/);
          console.log('Elementos seleccionados');
          /*console.log(this.selected);*/
         }

  }
  console.log('valor de selected  1er tablero');
  const select = this.selected;
  console.log(select);
 /* alert(this.selected);*/

};

seatClicked2 = function(seatPos: string) {
  /* cadena*/
  const index = this.selected2a3.indexOf(seatPos);
  if (index !== -1) {
      // seat already selected, remove
      this.selected2a3.splice(index, 1);
  } else {
      /*push to selected array only if it is not reserved*/
      if (this.reserved2a3.indexOf(seatPos) === -1) {
          /*let b = 'B';
          let e = 'E';
          let v = 'V';
          let data = ':' + b + ' : ' + e + ': ' + v;*/
          this.selected2a3.push(seatPos /* + data*/);
         }

  }
  console.log('valor de selected');
  const select = this.selected2a3;
  console.log(' valor de selected2a3  2do tablero' + select);

};


}

