import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';
import { HojaDeVidaService } from 'src/app/service/hoja-de-vida.service';

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

  constructor(private router: Router,
    private hojaDeVidaService: HojaDeVidaService) { }

  ngOnInit(): void {
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
