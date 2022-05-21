import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//PrimeNg
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {TimelineModule} from 'primeng/timeline';
import {CheckboxModule} from 'primeng/checkbox';

//MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

//Components
import { FormularioComponent } from './cliente/formulario/formulario.component';
import { RevisionComponent } from './cliente/revision/revision.component';
import { AsignacionComponent } from './empresa/asignacion/asignacion.component';
import { VerificacionComponent } from './proveedor/verificacion/verificacion.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginModule } from './login/login.module';
import {TableModule} from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { MenuPrincipalComponent } from './cliente/menu-principal/menu-principal.component';
import { HojaDeVidaComponent } from './cliente/hoja-de-vida/hoja-de-vida.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormularioComponent,
    RevisionComponent,
    AsignacionComponent,
    VerificacionComponent,
    InicioComponent,
    MenuPrincipalComponent,
    HojaDeVidaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    ReactiveFormsModule,    
    ToastModule,
    TimelineModule,
    MatCardModule,
    MatButtonModule,
    LoginModule,
    TableModule,
    InputTextareaModule,
    HttpClientModule,
    CheckboxModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
