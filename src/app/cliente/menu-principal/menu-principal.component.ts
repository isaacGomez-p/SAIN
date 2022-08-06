import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { UserEntity } from 'src/app/model/userEntity';
import { GeneralService } from 'src/app/service/general/general.service';
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

  seleccion: number = 1;
  
  constructor(private hojaDeVidaService: HojaDeVidaService, 
    private generalService: GeneralService) { }

  ngOnInit(): void {    

    if(this.hojaDeVidaService.obtenerUserLogin() != undefined &&
      this.hojaDeVidaService.obtenerUserLogin() != null){
        this.user = this.hojaDeVidaService.obtenerUserLogin();

        this.nombre = this.user!.name;
        switch(this.user!.roleEntity.roleId){
          case 1:
            this.rol = "Admin";
            this.menuAdmin();
            break;
          case 2:
            this.rol = "Cliente";
            this.menuCliente();
            break;
          case 3:
            this.rol = "Proveedor";
            if(this.nombre === "PROTMARK"){
              this.showRegister = true;
            }            
            this.menuProveedor();
            break;  
        }
      }
                
      

      
  }
  
  perfil(){
    this.seleccion = 0;
    this.generalService.navegar("perfil")
  }

  hojasDeVida(){
    this.seleccion = 1;
    this.generalService.navegar("hojaDeVida")
  }

  proveedor(){
    this.seleccion = 3;
    this.generalService.navegar("registro")
  }

  menuProveedor(){
    this.items = [
      {label: this.rol + ": " + this.nombre, icon: 'pi pi-user', command: (event) => {
        this.perfil();               
      }},        
      {label: 'Lista de Hojas de Vida', icon: 'pi pi-book', command: (event) => {
        this.hojasDeVida();               
      }},
      {label: 'Registrar Proveedor', icon: 'pi pi-user-plus', command: (event) => {
        this.proveedor();               
      }},
    ];    
  }

  menuCliente(){
    this.items = [
      {label: this.rol + ": " + this.nombre, icon: 'pi pi-user', command: (event) => {
        this.perfil();               
      }},        
      {label: 'Lista de Hojas de Vida', icon: 'pi pi-book', command: (event) => {
        this.hojasDeVida();               
      }}        
    ];
    
  }

  menuAdmin(){
    this.items = [
      {label: this.rol + ": " + this.nombre, icon: 'pi pi-user', command: (event) => {
        this.perfil();               
      }},        
      {label: 'Lista de Hojas de Vida', icon: 'pi pi-book', command: (event) => {
        this.hojasDeVida();               
      }}       
    ];    
  }

}