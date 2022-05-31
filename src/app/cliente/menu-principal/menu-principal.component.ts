import { Component, OnInit } from '@angular/core';
import { UserEntity } from 'src/app/model/userEntity';
import { HojaDeVidaService } from 'src/app/service/hojaDeVida/hoja-de-vida.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  user : UserEntity | null
  nombre: string = ""
  rol: string = ""
  constructor(private hojaDeVidaService: HojaDeVidaService) { }

  ngOnInit(): void {
    if(this.hojaDeVidaService.obtenerUserLogin() != undefined &&
      this.hojaDeVidaService.obtenerUserLogin() != null){
        this.user = this.hojaDeVidaService.obtenerUserLogin();

        this.nombre = this.user!.name;
        switch(this.user!.role){
          case 1:
            this.rol = "Admin";
            break;
          case 2:
            this.rol = "Cliente";
            break;
          case 3:
            this.rol = "Proveedor";
            break;  
        }
      }
  }

}
