import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HojaDeVidaComponentRoutingModule } from './hoja-de-vida-routing.module';
import {TimelineModule} from 'primeng/timeline';
import { AsignarDialog, FacturaDialog, FileDialog, ObservacionDialog, RegistrarDialog, ReportesDialog } from './hoja-de-vida.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { ConfirmacionDialog } from '../dialog/confirmacionDialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import { UploadFileComponent } from 'src/app/utils/upload-file/upload-file.component';
import {ListboxModule} from 'primeng/listbox';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [RegistrarDialog, AsignarDialog, ObservacionDialog, ConfirmacionDialog, FileDialog, UploadFileComponent, ReportesDialog, FacturaDialog],
  imports: [
    CommonModule,
    HojaDeVidaComponentRoutingModule,    
    TimelineModule,
    InputNumberModule,
    FormsModule,
    MatDialogModule,
    TableModule,
    MatButtonModule,
    DropdownModule,
    RadioButtonModule,
    FileUploadModule,
    ListboxModule,
    CalendarModule
  //  UploadFileModule
  ],
  exports: [
    UploadFileComponent
  ]
})
export class HojaDeVidaModule { }
