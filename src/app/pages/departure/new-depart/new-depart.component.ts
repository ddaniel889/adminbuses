import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartureService } from '../../../services/departure.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-depart',
  templateUrl: './new-depart.component.html',
  styleUrls: ['./new-depart.component.css']
})
export class NewDepartComponent implements OnInit {
  city: any = [];
  buses: any = [];
  public depart: FormGroup;
  operatorId: any = '239329c1-2129-32d7-9e4e-44d0b4cb0d51';
  departureTime: any;
  arrivalTime: any;
  originId: any;
  destinationId: any;
  duration: any;
  numTransfers: any;
  price: any;
  objBus: any;
  termsOfService: any;
  busId: any;
  selectBus: any;
  filtered: any;
  origen: any;
  destino: any;
  timeZone: string;

  constructor(public formBuilder: FormBuilder, public departureService: DepartureService, private  actRoute: ActivatedRoute, 
    private router: Router) {
    this.timeZone = 'America/La_Paz';
    this.departureTime = '2020-01-15T16:22:27.605-07:00';
    this.arrivalTime = '2020-01-15T16:22:27.605-07:00';

   }

  ngOnInit() {
    this.depart = this.formBuilder.group({
      timeZone: ['America/La_Paz', Validators.compose([Validators.required])],
      departureTime: ['', Validators.compose([Validators.required])],
      arrivalTime: ['', Validators.compose([Validators.required])],
      originId: ['', Validators.compose([Validators.required])],
      destinationId: ['', Validators.compose([Validators.required])],
      duration: ['', Validators.compose([Validators.required])],
      numTransfers: ['', Validators.compose([Validators.required])],
      busId: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      currency: ['', Validators.compose([Validators.required])],
      discount: ['', Validators.compose([Validators.required])],
      termsOfService: ['', Validators.compose([Validators.required])],
      condition: ['', Validators.compose([Validators.required])]

    });
    console.log(this.depart.value);
    this.getcity();
    this.getBuses();
  }

  getcity() {
    this.departureService.getCity()
    .subscribe( city => this.city = city );
    console.log(this.city);

   }

   getBuses() {
     this.departureService.cargarbuses()
     .subscribe( bus => this.buses = bus );
     console.log(this.buses);
   }

   origin() {
      let a: any = this.originId;
      this.origen = a.id;
      console.log(' valor ciudad de origen');
      console.log(this.origen);
   }

   bus() {
     const d: any = this.depart.value.busId;
     console.log(d);
     this.selectBus = d.id;
     console.log(this.selectBus);
   }

   desti() {
    const c: any = this.destinationId;
    this.destino = c.id;
    console.log('destino');
    console.log(this.destino);
   }

  Guardar(  ) {

    const duraTime = this.converTime(this.depart.value.duration);
    console.log(duraTime);
     const data = {
    operatorId : 'fa1f40ab-e61a-3379-8cea-32cd9e1bc29e',
    timeZone: this.depart.value.timeZone,
    duration: duraTime,
    departureTime: '2020-01-15T16:22:27.605-07:00',
    arrivalTime: '2020-01-15T16:22:27.605-07:00',
    originId: this.origen,
    destinationId : this.destino,
    numTransfers: this.depart.value.numTransfers,
    busId: this.selectBus,
    price: {currency: this.depart.value.currency,
        total: this.depart.value.price,
        discount: this.depart.value.discount},
    termsOfService: [
      {
        name: this.depart.value.termsOfService,
        value: this.depart.value.condition
      }
    ]
   };

     console.log(this.depart.value);
     console.log(data);
     this.departureService.createDeparture(data).subscribe(
        response => {
          this.router.navigateByUrl('/list-depart');
           console.log(response);
        },
        error => {
           console.log(error);
        }

     );

  }

  time(event) {
   let c = this.converTime(event.target.value);
   console.log(c);

  }

  converTime(a) {
     return 'PT' + a + 'H';
  }

}
