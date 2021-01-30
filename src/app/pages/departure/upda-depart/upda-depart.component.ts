import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartureService } from '../../../services/departure.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-upda-depart',
  templateUrl: './upda-depart.component.html',
  styleUrls: ['./upda-depart.component.css']
})
export class UpdaDepartComponent implements OnInit {
  submitted = false;
  data: any = [];
  city: any = [];
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
  id: any;
  orig: any;
  obus = [];
  dest: any;
  odest = [];
  constructor(public departureService: DepartureService,
              public formBuilder: FormBuilder , private  actRoute: ActivatedRoute,  private router: Router) {


  }

  ngOnInit() {
    this.load();
    console.log(this.load());
    this.getcity();
   /* this.update();*/
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getDepart(this.id);
    this.depart = this.formBuilder.group({
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
  }

  load() {
    this.departureService.loadDeparture()
    .subscribe( departure => this.data = departure );

     }

     getcity() {
      this.departureService.getCity()
      .subscribe( city => this.city = city );
      console.log(this.city);
     }

     origin(a, k) {
      /*respuesta de servicio*/
      let orig;
      for (const one of k) {
         const name = one.fullName;
         console.log('valor de otra propiedad' + name);
         if (a === name ) {
            orig = one.id;
            console.log('valor de this.orig' + orig );
         }
       }
      return orig;
     }

     destin(b, k ) {
    /*respuesta de servicio*/
    let  dest;
    for (const one of k) {
        const name = one.fullName;
        console.log('valor de otra propiedad' + name);
        if (b === name ) {
           dest = one.id;
           console.log('valor de this.dest' + dest);
        }
      }
    return dest;
     }
     getDepart(id) {
      this.departureService.getDepartureId(id).subscribe(data => {
        console.log('valor de data');
        console.log(data);
        console.log(data.termsOfService);
        this.depart.setValue({
          departureTime: data.departureTime,
          arrivalTime: data.arrivalTime,
          originId: data.origin.fullName,
          destinationId: data.destination.fullName,
          duration: data.duration ,
          numTransfers: data.numTransfers,
          busId: data.bus.id,
          price: data.price.total,
          currency: data.price.currency,
          discount: data.price.discount ,
          termsOfService: data.termsOfService[0].name,
          condition: data.termsOfService[0].value
        });
      });
    }

    update() {
      this.depart = this.formBuilder.group({
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
    }

    onSubmit() {

      console.log(this.depart.value);
      this.submitted = true;
      this.id = this.actRoute.snapshot.paramMap.get('id');
      let a = this.origin(this.depart.value.originId, this.city);
      console.log('valor de' + a);
      let b = this.destin(this.depart.value.destinationId, this.city);
      console.log('valor de' + b);
      const objectBus = {
        timeZone: 'America/La_Paz',
        duration: this.depart.value.duration,
        departureTime: this.depart.value.departureTime,
        arrivalTime: this.depart.value.arrivalTime,
        originId: a , /*this.depart.value.originId  */
        destinationId :  b, /*this.depart.value.destinationId */
        numTransfers: this.depart.value.numTransfers,
        busId: this.depart.value.busId,
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
      console.log('object bus' + this.objBus );
      console.log('object bus' + this.objBus );
      this.departureService.updateDeparture(objectBus, this.id)
            .subscribe(res => {
             console.log(res);
             this.router.navigateByUrl('/list-depart');
             console.log('Content updated successfully!');
            }, (error) => {
              Swal.fire('No se pudo actualizar, revisar el formato de datos.');
              console.log(error);
            });
    }



}
