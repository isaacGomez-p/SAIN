import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';
import { HojaDeVidaService } from 'src/app/service/hoja-de-vida.service';
import {PrimeIcons} from 'primeng/api';


@Component({
  selector: 'app-hoja-de-vida',
  templateUrl: './hoja-de-vida.component.html',
  styleUrls: ['./hoja-de-vida.component.css']
})
export class HojaDeVidaComponent implements OnInit {

  cargando: boolean = false;

  hojasDeVida = [
    {
      id: 1,
      description : "Eduardo Fierro",
      estado: 'Espera',
      user : {
          userId : 1
      }      
    },
    {
      id: 2,
      description : "Carlos Tinoco",
      estado: 'Espera',
      user : {
          userId : 2
      }      
    }
  ]
  events: any[];

  constructor(private router: Router,
    private hojaDeVidaService: HojaDeVidaService) { }

  ngOnInit(): void {

    this.events = [
      {status: 'Registrados: 15', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
      {status: 'Espera: 10', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
      {status: 'Verificado: 3', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
      {status: 'Terminado: 18', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
  ];

    window.localStorage.removeItem("idHV");
    if(window.localStorage.getItem("hv") !== null){
      this.hojasDeVida = JSON.parse(window.localStorage.getItem("hv")  || '{}');
    }    
  }

  verHojaDeVida(id: number){
    this.hojaDeVidaService.guardarIdHojaDevida(id);
    window.localStorage.setItem("idHV", id.toString());
    this.router.navigate(["/formulario"], {skipLocationChange:true})
  }

  agregar(){
    window.localStorage.setItem("hv", JSON.stringify(this.hojasDeVida));
    this.router.navigate(["/formulario"], {skipLocationChange:true})
  }

}
