import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HojaDeVidaComponentRoutingModule } from './hoja-de-vida-routing.module';
import {TimelineModule} from 'primeng/timeline';
import { RegistrarDialog } from './hoja-de-vida.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RegistrarDialog],
  imports: [
    CommonModule,
    HojaDeVidaComponentRoutingModule,    
    TimelineModule,
    InputNumberModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class HojaDeVidaModule { }
