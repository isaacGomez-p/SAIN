import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HojaDeVidaComponentRoutingModule } from './hoja-de-vida-routing.module';
import {TimelineModule} from 'primeng/timeline';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HojaDeVidaComponentRoutingModule,    
    TimelineModule
  ]
})
export class HojaDeVidaModule { }
