import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../../services/service.index';
import { Bus } from '../../../models/bus.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delet-depart',
  templateUrl: './delet-depart.component.html',
  styleUrls: ['./delet-depart.component.css']
})
export class DeletDepartComponent implements OnInit {
  error: boolean;
  buses = [];
  Mybus: Bus[] = [];
  busServices: Bus[] = [];
  constructor(private  actRoute: ActivatedRoute, public busService: BusService) { }

  ngOnInit() {
    this.actRoute.params.subscribe( params => {
      console.log(params['word']);
      /*this.termino = (params['termino']);*/
      this.findBus(params['word']);
      /* this.buses = this.busService.findBus(params['word']);   */
     /* console.log(this.buses);*/
    });
  }

  findBus( word: string): any  {
    const bus = [];
     /*respuesta de servicio*/
    this.busService.cargarbuses().subscribe( buses => {
      this.busServices = buses;
      console.log(this.busServices);
      word = word.toLocaleLowerCase();
      for (const one of this.busServices) {
        const modelo = one.model.toLocaleLowerCase();
        console.log('valor de otra propiedad' + one.availableSeats);
        if (modelo.indexOf(word) >= 0 ) {
           this.buses.push(one);
        } else {
          this.error = true;
        }
      }
      /*return bus;*/

      }
    );

  }

}
