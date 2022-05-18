import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponentRoutingModule } from './formulario-routing.module';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormularioComponentRoutingModule,
    TableModule
  ]
})
export class FormularioModule { }
