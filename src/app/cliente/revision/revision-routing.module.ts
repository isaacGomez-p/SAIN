import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevisionComponent } from './revision.component';


const routes: Routes = [
  {
    path: '', component: RevisionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],  
  exports: [RouterModule]
})
export class RevisionComponentRoutingModule {}