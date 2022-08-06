import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponentRoutingModule } from './registro-routing.module';
import { RevisionModule } from '../cliente/revision/revision.module';
import { FormularioModule } from '../cliente/formulario/formulario.module';

@NgModule({
  declarations: [
//    PerfilComponent    
  ],
  imports: [
    CommonModule,
    RegistroComponentRoutingModule,
    RevisionModule,
    FormularioModule,
  ],
  exports: []
})
export class RegistroModule { }