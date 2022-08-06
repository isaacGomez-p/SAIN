import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponentRoutingModule } from './perfil-routing.module';
import { MenuPrincipalModule } from 'src/app/cliente/menu-principal/menu-principal.module';



@NgModule({
  declarations: [    
  ],
  imports: [
    CommonModule,
    PerfilComponentRoutingModule,    
    
  ],
  exports: []
})
export class PerfilModule { }