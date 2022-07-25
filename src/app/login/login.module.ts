import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponentRoutingModule } from './login-routing.module';
import { RevisionModule } from '../cliente/revision/revision.module';
import { FormularioModule } from '../cliente/formulario/formulario.module';
import { UploadFileComponent } from '../utils/upload-file/upload-file.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginComponentRoutingModule,
    RevisionModule,
    FormularioModule
  ],
  exports: []
})
export class LoginModule { }
