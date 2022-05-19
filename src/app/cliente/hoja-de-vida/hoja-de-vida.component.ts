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

  hojasDeVida = [
    {
      id: 1,
      description : "Eduf7",
      estado: 'Espera',
      user : {
          userId : 1
      }      
    },
    {
      id: 2,
      description : "Tinoco",
      estado: 'Espera',
      user : {
          userId : 2
      }      
    }
  ]

  constructor(private router: Router,
    private hojaDeVidaService: HojaDeVidaService) { }

  ngOnInit(): void {
  }

  verHojaDeVida(id: number){
    this.hojaDeVidaService.guardarIdHojaDevida(id);
    this.router.navigate(["/formulario"], {skipLocationChange:true})
  }

}
