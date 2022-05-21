import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  nombre: string = "Isaac"
  rol: string = "Proveedor"
  constructor() { }

  ngOnInit(): void {
  }

}
