import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponentRoutingModule } from './formulario-routing.module';
import {TableModule} from 'primeng/table';
import { ObservacionDialog } from './formulario.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TimelineModule} from 'primeng/timeline';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { ConfirmacionDialog } from '../dialog/confirmacionDialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import { UploadFileComponent } from 'src/app/utils/upload-file/upload-file.component';
import {ListboxModule} from 'primeng/listbox';


@NgModule({
  declarations: [ObservacionDialog],
  imports: [
    CommonModule,
    FormularioComponentRoutingModule,
    TableModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    InputTextareaModule,  
    TimelineModule,
    InputNumberModule,
    FormsModule,
    DropdownModule,
    RadioButtonModule,
    FileUploadModule,
    ListboxModule
  ]
})
export class FormularioModule { }
