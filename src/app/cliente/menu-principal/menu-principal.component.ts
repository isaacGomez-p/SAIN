import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { UserEntity } from 'src/app/model/userEntity';
import { HojaDeVidaService } from 'src/app/service/hojaDeVida/hoja-de-vida.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  abrirMenu: boolean = false;

  items: MenuItem[];
  activeItem: MenuItem;

  user : UserEntity | null
  nombre: string = ""
  rol: string = ""
  showRegister : boolean = false;
  constructor(private hojaDeVidaService: HojaDeVidaService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    this.primengConfig.ripple = true;

    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home'},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
      {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
      {label: 'Documentation', icon: 'pi pi-fw pi-file'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
  ];
  this.activeItem = this.items[0];

    if(this.hojaDeVidaService.obtenerUserLogin() != undefined &&
      this.hojaDeVidaService.obtenerUserLogin() != null){
        this.user = this.hojaDeVidaService.obtenerUserLogin();

        this.nombre = this.user!.name;
        switch(this.user!.roleEntity.roleId){
          case 1:
            this.rol = "Admin";
            break;
          case 2:
            this.rol = "Cliente";
            break;
          case 3:
            this.rol = "Proveedor";
            if(this.nombre === "PROTMARK"){
              this.showRegister = true;
            }            
            break;  
        }
      }
  }
}