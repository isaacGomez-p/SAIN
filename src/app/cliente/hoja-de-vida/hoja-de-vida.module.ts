import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HojaDeVidaComponentRoutingModule } from './hoja-de-vida-routing.module';
import {TimelineModule} from 'primeng/timeline';
import { AsignarDialog, ObservacionDialog, RegistrarDialog } from './hoja-de-vida.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { ConfirmacionDialog } from '../dialog/confirmacionDialog';
@NgModule({
  declarations: [RegistrarDialog, AsignarDialog, ObservacionDialog, ConfirmacionDialog],
  imports: [
    CommonModule,
    HojaDeVidaComponentRoutingModule,    
    TimelineModule,
    InputNumberModule,
    FormsModule,
    MatDialogModule,
    TableModule,
    MatButtonModule,
    DropdownModule
  ]
})
export class HojaDeVidaModule { }
