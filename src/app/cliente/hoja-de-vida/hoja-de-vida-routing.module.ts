import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HojaDeVidaComponent } from './hoja-de-vida.component';


const routes: Routes = [
  {
    path: '', component: HojaDeVidaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],  
  exports: [RouterModule]
})
export class HojaDeVidaComponentRoutingModule {}