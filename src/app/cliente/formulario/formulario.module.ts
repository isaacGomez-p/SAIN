import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponentRoutingModule } from './formulario-routing.module';
import {TableModule} from 'primeng/table';
import { ObservacionDialog } from './formulario.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ObservacionDialog],
  imports: [
    CommonModule,
    FormularioComponentRoutingModule,
    TableModule,
    MatDialogModule
  ]
})
export class FormularioModule { }
