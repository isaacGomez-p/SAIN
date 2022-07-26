import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro.component';


const routes: Routes = [
  {
    path: '', component: RegistroComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],  
  exports: [RouterModule]
})
export class RegistroComponentRoutingModule {}