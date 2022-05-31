import { Component } from '@angular/core';
import { HojaDeVidaService } from './service/hojaDeVida/hoja-de-vida.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  inicionSesiada: boolean = false;

  title = 'sain';

  constructor(private hojaDeVidaService: HojaDeVidaService){}

  cerrarSesion(){
    this.hojaDeVidaService.cerrarSesion();
  }

}
