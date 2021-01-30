import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    // asignar una tarea, cuando intervalo de segundo se cumpla

  this.contarTres() .then(
      mensaje => console.log('Termino!', mensaje)
    )
    .catch( error => console.error('error en la promesa', error));

  }


  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise(( resolve, reject ) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        console.log( contador );
        if (contador === 3) {
          resolve(true);
          // reject('Termino con error');
          clearInterval(intervalo);
        }
        }, 1000);
      });
    }
}
