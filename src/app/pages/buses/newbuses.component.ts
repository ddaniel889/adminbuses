import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { BusService } from '../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newbuses',
  templateUrl: './newbuses.component.html',
  styles: ['./newbuses.component.css']
})
export class NewbusesComponent implements OnInit {

  modelo: any;
  clase: any;
  soa: any;
  amenities: any;
  a: any;
  data: boolean;
  error14: boolean;
  seat14: boolean;
  error13: boolean;
  error23: boolean;
  error24: boolean;
  error2b2: boolean;
  error2b3: boolean;
  availableSeats: number;
  public form: FormGroup;
  public bus2a4: FormGroup;
  public bus2b3: FormGroup;
  public bus2a3: FormGroup;
  public bus2b2: FormGroup;
  public bus13: FormGroup;
  seats: any;
  selection: any;
  seatsVect = [];
  seatsPb = [];
  reserved = [];
  plant: any;
  table: boolean = false;
  fillrow24: number;
  table13: boolean = false;
  table23: boolean = false;
  table24: boolean = false;
  table2b3: boolean = false;
  table2b2: boolean = false;
  next: boolean = false;
  seat: boolean;
  selectedDay: any;
  columns = [];
  columns2b = [];
  columns3b = [];
  rows2b = [];
  rows3b = [];
  add = [];
  rows2 = [];
  odd = [];

 public bus: FormGroup;
   rows: string[];
   cols: number[];
   seats13 = [];
   numero: number;
   numero13: number;
   numero23: number;
   selected: string[] = [];
   reserved2a3 = [];
   selected2a3 = [];
   div: number;
   div2: number;

  constructor( public busService: BusService, public formBuilder: FormBuilder, private  actRoute: ActivatedRoute,  private router: Router) {
    this.selected = [];
    this.main();
    this.mainForm();
    this.bus24();
    this.b2b3();
    this.b2a3();
    this.b2b2();
    this.b13();
  }

  ngOnInit() {
    this.cols = [];
  }

  mainForm() {
    this.form = this.formBuilder.group({
      operatorId: ['239329c1-2129-32d7-9e4e-44d0b4cb0d51'],
      model: ['', Validators.compose([Validators.required])],
      availableSeats: ['', Validators.compose([Validators.required])],
      seats: [
               ''
    ],
      vin: ['', Validators.compose([Validators.required])],
      amenities: ['', Validators.compose([Validators.required])],
      clase: ['', Validators.compose([Validators.required])],
      plant: ['', Validators.compose([Validators.required])],
      numero: ['', Validators.compose([Validators.required])],
    });
    console.log(this.form.value);
    console.log(this.form.value.wifi);
  }



  b13() {
    this.bus13 = this.formBuilder.group({
      numero13: ['', Validators.compose([Validators.required])],
    });
  }

   main() {
    this.bus = this.formBuilder.group({
      numero: ['', Validators.compose([Validators.required])],
    });
   }

   b2a3() {
     this.bus2a3 = this.formBuilder.group({
      numero23: ['', Validators.compose([Validators.required])],
    });
   }
   bus24() {
     this.bus2a4 = this.formBuilder.group({
      numero24: ['', Validators.compose([Validators.required])],
    });
   }

   b2b3() {
    this.bus2b3 = this.formBuilder.group({
      numero2b3: ['', Validators.compose([Validators.required])],
    });
   }

   b2b2() {
    this.bus2b2 = this.formBuilder.group({
      numero2b2: ['', Validators.compose([Validators.required])],
    });
   }

  saveData() {
   const amenities = ['WIFI', 'USB_CHARGER', 'RADIO' ];
   console.log('Planta 1' + this.seatsVect);
   console.log('Planta 2' + this.seatsPb);
   this.selection = [];
   if(this.seatsPb) {
    this.selection = this.seatsVect.concat(this.seatsPb);
    console.log(this.selection);
   } else {
     this.selection = this.seatsVect;
     console.log(this.selection);
   }
   console.log('total de asientos seleccionados ' + this.seatsVect);
   console.log(this.selected);
   const arrSeat = this.selected.concat(this.selected2a3);
   const arSeat = arrSeat.toString();
   const arrRepl = arSeat.replace(/A/g, 'B');
   const operator = 'fa1f40ab-e61a-3379-8cea-32cd9e1bc29e';
   const objectBus = {
         operatorId: operator.toString(),
         model: this.form.value.model.toString(),
         availableSeats: parseInt(this.form.value.availableSeats),
         seats: [ this.selection.toString()],
         vin: this.form.value.vin.toString(),
         amenities: [ this.form.value.amenities ], 
         class: this.form.value.clase.toString()
     };
   console.log(objectBus);
   this.busService.crearBuses(objectBus).subscribe(
         response => {
           console.log(response);
           this.router.navigateByUrl('/listbuses');
         },
         error => {
           console.log(error);
           this.data = true;
           console.log(this.data);
         }
    );
  }

  selectChangeHandler(event) {
    this.ngOnInit();
    this.seat = true;
    this.selectedDay = event.target.value;
    const a = this.seats;
    console.log(this.selectedDay);
  }

  fill14() {
      const fillrow = this.bus.value.numero;
      if(fillrow > this.form.value.availableSeats) {
       this.seat14 = true;
       /*this.error14 = true;*/
      } else {
      console.log(fillrow);
      console.log(this.form.value.availableSeats);
      console.log(this.error14);
      this.table = true;
      this.seat14 = false;
      this.error14 = false;
      console.log(this.bus.value.numero);
      const fillcol = 4;
      if (fillrow % fillcol === 0) {
      this.div = fillrow / fillcol;
      for (let i = 0; i < fillcol; i++) {
        this.columns.push(i);
       }
      for (let i = 0 ; i < this.div; i++) {
        this.rows2.push(i);
       }
      this.rows2.forEach((row) => {
         this.columns.forEach((col) => {
          const no = (row * fillcol) + col + 1;
          this.seatsVect.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
          console.log(no);
         });
       });
    } else {
      const rest = fillrow % fillcol;
      console.log(rest);
      const resta = fillrow - rest;
      this.div = resta / fillcol;
      for (let i = 0; i < fillcol; i++) {
        this.columns.push(i);
       }
      for (let i = 0 ; i < this.div; i++) {
        this.rows2.push(i);
       }
      this.rows2.forEach((row) => {
         this.columns.forEach((col) => {
          const no = (row * fillcol) + col + 1;
          this.odd.push(no + ':' + 'A' + ':' + 'E' + ':' + 'V' + ':' + '|');
          console.log('multiplicación de ' + col * row);
          console.log(no);
         });
       });
      const index = this.div * fillcol + 1;
      const max = fillrow + 1;
      for ( let i = index ; i < max ; i++) {
        this.add.push(i + ':' + 'A' + ':' + 'E' + ':' + 'V' + ':' + '|');
       }
      this.seatsVect = this.odd.concat(this.add);
      }
   }
  }

  fill13() {
    const fillrow = this.bus13.value.numero13;
    if( fillrow > this.form.value.availableSeats ) {
        this.error13 = true;
     } else {
    this.table13 = true;
    this.error13 = false;
    console.log(this.bus13.value.numero13);
    const fillcol = 3;
    if (fillrow % fillcol === 0) {
      this.div = fillrow / fillcol;
      for (let i = 0; i < fillcol; i++) {
        this.columns.push(i);
       }
      for (let i = 0 ; i < this.div; i++) {
        this.rows2.push(i); 
       }
      this.rows2.forEach((row) => {
         this.columns.forEach((col) => {
          const no = (row * fillcol) + col + 1;
          this.seatsVect.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
          console.log(no);
         });
       });
      console.log('BUCLEEEEEEEEEEEEE PARRRRRRRRRRRRRRRRRRRRRRR');
    } else {
      const rest = fillrow % fillcol;
      console.log(rest);
      const resta = fillrow - rest; 
      this.div = resta / fillcol;
      console.log('valor de div' + this.div);
      console.log('valor de fillcol' + fillcol);
      for (let i = 0; i < fillcol; i++) {
        this.columns.push(i);
       }
      for (let i = 0 ; i < this.div; i++) {
        this.rows2.push(i);
       }
      this.rows2.forEach((row) => {
         this.columns.forEach((col) => {
          const no = (row * fillcol) + col + 1;
          this.odd.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
          console.log('multiplicación de ' + col * row);
          console.log(no);
         });
       });
      const index = this.div * fillcol + 1;
      console.log('valor de index' + index);
      const max = fillrow + 1;
      console.log('valor de max' + max);
      for ( let i = index ; i < max ; i++) {
        this.add.push(i+':'+'A'+':'+'E'+':'+'V'+':'+'|');
       }
      console.log('vector agregado'  + this.add);
      this.seatsVect = this.odd.concat(this.add);
      console.log('valor de seats' + this.seats);
      console.log('BUCLE IMPAR');
      }
    }

 }

  fill23() {
  this.fillrow24 = this.bus2a3.value.numero23;
  if(this.fillrow24 > this.form.value.availableSeats ) {
     this.error23 = true;
  } else {
  this.table23 = true;
  this.error23 = false;
  const fillcol = 3;
  if (this.fillrow24 % fillcol === 0) {
    this.div = this.fillrow24 / fillcol;
    for (let i = 0; i < fillcol; i++) {
      this.columns.push(i);
     }
    for (let i = 0 ; i < this.div; i++) {
      this.rows2.push(i);
     }
    this.rows2.forEach((row) => {
       this.columns.forEach((col) => {
        const no = (row * fillcol) + col + 1;
        this.seatsVect.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
        console.log(no);
       });
     });
    console.log('BUCLEEEEEEEEEEEEE PARRRRRRRRRRRRRRRRRRRRRRR');
  } else {
    const rest = this.fillrow24 % fillcol;
    console.log(rest);
    const resta = this.fillrow24 - rest; 
    this.div = resta / fillcol;
    console.log('valor de div' + this.div);
    console.log('valor de fillcol' + fillcol);
    for (let i = 0; i < fillcol; i++) {
      this.columns.push(i);
     }
    for (let i = 0 ; i < this.div; i++) {
      this.rows2.push(i);
     }
    this.rows2.forEach((row) => {
       this.columns.forEach((col) => {
        const no = (row * fillcol) + col + 1;
        this.odd.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
        console.log('multiplicación de ' + col * row);
        console.log(no);
       });
     });
    const index = this.div * fillcol + 1;
    console.log('valor de index' + index);
    const max = this.fillrow24 + 1;
    console.log('valor de max' + max);
    for ( let i = index ; i < max ; i++) {
      this.add.push(i+':'+'A'+':'+'E'+':'+'V'+':'+'|');
     }
    console.log('vector agregado'  + this.add);
    this.seatsVect = this.odd.concat(this.add);
    console.log('valor de seats' + this.seats);
    console.log('BUCLE IMPAR');
    }
  }
}

fill24() {
  this.fillrow24 = this.bus2a4.value.numero24;
  if(this.fillrow24 > this.form.value.availableSeats) {
    this.error24 = true;
  } else {
  this.table24 = true;
  this.error24 = false;
  const fillcol = 4;
  if (this.fillrow24 % fillcol === 0) {
    this.div = this.fillrow24 / fillcol;
    for (let i = 0; i < fillcol; i++) {
      this.columns.push(i);
     }
    for (let i = 0 ; i < this.div; i++) {
      this.rows2.push(i);
     }
    this.rows2.forEach((row) => {
       this.columns.forEach((col) => {
        const no = (row * fillcol) + col + 1;
        this.seatsVect.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
        console.log(no);
       });
     });
    console.log('BUCLEEEEEEEEEEEEE PARRRRRRRRRRRRRRRRRRRRRRR');
  } else {
    const rest = this.fillrow24 % fillcol;
    console.log(rest);
    const resta = this.fillrow24 - rest; /* vector irregular */
    this.div = resta / fillcol;
    console.log('valor de div' + this.div);
    console.log('valor de fillcol' + fillcol);
    for (let i = 0; i < fillcol; i++) {
      this.columns.push(i);
     }
    for (let i = 0 ; i < this.div; i++) {
      this.rows2.push(i); /*String.fromCharCode(65 + i)*/
     }
    this.rows2.forEach((row) => {
       this.columns.forEach((col) => {
        // const no = row + col; (t*4)+ i+1
        const no = (row * fillcol) + col + 1;
       /* switch (no) {
          case 1:*/
        this.odd.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
        console.log('multiplicación de ' + col * row);
        console.log(no);
       });
     });
    const index = this.div * fillcol + 1;
    console.log('valor de index' + index);
    const max = this.fillrow24 + 1;
    console.log('valor de max' + max);
    for ( let i = index ; i < max ; i++) {
      this.add.push(i+':'+'A'+':'+'E'+':'+'V'+':'+'|');
     }
    console.log('vector agregado'  + this.add);
    this.seatsVect = this.odd.concat(this.add);
    console.log('valor de seats' + this.seats);
    console.log('BUCLE IMPAR');
    }
  }

}

fill2b3() {
  const fillrow = this.bus2b3.value.numero2b3;
  if(fillrow > this.form.value.availableSeats || fillrow > this.fillrow24  ) {
    console.log('planta alta' + this.fillrow24);
    this.error2b3 = true;
   } else {
  this.error2b3 = false;
  this.table2b3 = true;
  const fillcol = 3;
  if (fillrow % fillcol === 0) {
    this.seatsPb = [];
    this.div2 = fillrow / fillcol;
    for (let i = 0; i < fillcol; i++) {
      this.columns2b.push(i);
     }
    for (let i = 0 ; i < this.div2; i++) {
      this.rows2b.push(i);
     }
    this.rows2b.forEach((row) => {
       this.columns2b.forEach((col) => {
        const no = (row * fillcol) + col + 1;
        this.seatsPb.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
        console.log(no);
       });
     });
    console.log('BUCLEEEEEEEEEEEEE PARRRRRRRRRRRRRRRRRRRRRRR');
  } else {
    this.seatsPb = [];
    const rest = fillrow % fillcol;
    console.log(rest);
    const resta = fillrow - rest; /* vector irregular */
    this.div2 = resta / fillcol;
    console.log('valor de div' + this.div2);
    console.log('valor de fillcol' + fillcol);
    for (let i = 0; i < fillcol; i++) {
      this.columns2b.push(i);
     }
    for (let i = 0 ; i < this.div2; i++) {
      this.rows2b.push(i); /*String.fromCharCode(65 + i)*/
     }
    this.rows2b.forEach((row) => {
       this.columns2b.forEach((col) => {
        // const no = row + col; (t*4)+ i+1
        const no = (row * fillcol) + col + 1;
       /* switch (no) {
          case 1:*/
        this.odd.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
        console.log('multiplicación de ' + col * row);
        console.log(no);
       });
     });
    const index = this.div2 * fillcol + 1;
    console.log('valor de index' + index);
    const max = fillrow + 1;
    console.log('valor de max' + max);
    for ( let i = index ; i < max ; i++) {
      this.add.push(i+':'+'A'+':'+'E'+':'+'V'+':'+'|');
     }
    console.log('vector agregado'  + this.add);
    this.seatsPb = this.odd.concat(this.add);
    console.log('valor de seats' + this.seats);
    console.log('BUCLE IMPAR');
    }
  }
}

fill2b2() {
  const fillrow = this.bus2b2.value.numero2b2;
  if(fillrow > this.form.value.availableSeats || fillrow > this.fillrow24  ) {
    console.log('planta alta' + this.fillrow24);
    this.error2b2 = true;
   } else {
  this.table2b2 = true;
  this.error2b2 = false;
  const fillcol = 2;
  if (fillrow % fillcol === 0) {
    this.seatsPb = [];
    this.div2 = fillrow / fillcol;
    for (let i = 0; i < fillcol; i++) {
      this.columns2b.push(i);
     }
    for (let i = 0 ; i < this.div2; i++) {
      this.rows2.push(i); /*String.fromCharCode(65 + i)*/
     }
    this.rows2.forEach((row) => {
       this.columns2b.forEach((col) => {
        // const no = row + col; (t*4)+ i+1
        const no = (row * fillcol) + col + 1;
        this.seatsPb.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
        console.log(no);
       });
     });
    console.log('BUCLEEEEEEEEEEEEE PARRRRRRRRRRRRRRRRRRRRRRR');
  } else {
    this.seatsPb = [];
    const rest = fillrow % fillcol;
    console.log(rest);
    const resta = fillrow - rest;
    this.div2 = resta / fillcol;
    console.log('valor de div' + this.div2);
    console.log('valor de fillcol' + fillcol);
    for (let i = 0; i < fillcol; i++) {
      this.columns2b.push(i);
     }
    for (let i = 0 ; i < this.div2; i++) {
      this.rows2b.push(i);
     }
    this.rows2b.forEach((row) => {
       this.columns2b.forEach((col) => {
        const no = (row * fillcol) + col + 1;
        this.odd.push(no+':'+'A'+':'+'E'+':'+'V'+':'+'|');
        console.log('multiplicación de ' + col * row);
        console.log(no);
       });
     });
    const index = this.div2 * fillcol + 1;
    console.log('valor de index' + index);
    const max = fillrow + 1;
    console.log('valor de max' + max);
    for ( let i = index ; i < max ; i++) {
      this.add.push(i+':'+'A'+':'+'E'+':'+'V'+':'+'|');
     }
    console.log('vector agregado'  + this.add);
    this.seatsPb = this.odd.concat(this.add);
    console.log('valor de seats' + this.seatsPb);
    console.log('BUCLE IMPAR');
    }
  }

}

nextStep() {
  this.next = true;
}
   /*return status of each seat*/
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


   clearSelected = function() {
       this.selected = [];
   };

   /*click handler*/
   seatClicked = function(seatPos: string) {
       /* cadena*/
       const index = this.selected.indexOf(seatPos);
       if (index !== -1) {
           // seat already selected, remove
           this.selected.splice(index, 1);
       } else {
           /*push to selected array only if it is not reserved*/
           if (this.reserved.indexOf(seatPos) === -1) {
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

   /*Buy button handler*/
   showSelected = function() {
       if (this.selected.length > 0) {
           alert('Selected Seats: ' + this.selected);
       } else {
           alert('No seats selected!');
       }
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
            this.selected2a3.push(seatPos /* + data*/);
           }

    }
    console.log('valor de selected');
    const select = this.selected2a3;
    console.log(' valor de selected2a3  2do tablero' + select);

};

}
