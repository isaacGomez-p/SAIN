import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {

  nombre: string = "PEPITO"

  constructor(private router: Router) { }

  events: any[];
    
    ngOnInit() {
        this.events = [
            {status: 'Registrado', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
            {status: 'Espera', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
            {status: 'Verificado', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
            {status: 'Terminado', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
        ];
    }

    estado(){
      this.router.navigate(["/revision"], {skipLocationChange:true})
    }

    formulario(){
      this.router.navigate(["/formulario"], {skipLocationChange:true})
    }

}
