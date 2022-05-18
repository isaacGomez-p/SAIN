import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionComponentRoutingModule } from './revision-routing.module';

import {TimelineModule} from 'primeng/timeline';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RevisionComponentRoutingModule,
    TimelineModule
  ]
})
export class RevisionModule { }
