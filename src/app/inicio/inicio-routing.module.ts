import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';


const routes: Routes = [
  {
    path: '', component: InicioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],  
  exports: [RouterModule]
})
export class InicioComponentRoutingModule {}