import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponentRoutingModule } from './login-routing.module';
import { RevisionModule } from '../cliente/revision/revision.module';
import { FormularioModule } from '../cliente/formulario/formulario.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginComponentRoutingModule,
    RevisionModule,
    FormularioModule
  ]
})
export class LoginModule { }
