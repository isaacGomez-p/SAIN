import { _resolveDirectionality } from '@angular/cdk/bidi/directionality';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RolEntity } from '../model/rolEntity';
import { UserEntity } from '../model/userEntity';
import { GeneralService } from '../service/general/general.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nombre: string;
  apellido: string;
  numeroIdentificacionRegistro: string;
  clave: string = "";
  claveConfirmarRegistro: string;
  rolRegistro: RolEntity;  
  email: string = "";

  constructor(private generalService:GeneralService,
    private messageService : MessageService
    ) { }

  ngOnInit(): void {
    this.limpiarCampos();
  }

  registrar(){

    if(this.clave == this.claveConfirmarRegistro){    
      let user = new UserEntity();
      user.email = this.email;
      user.identification = this.numeroIdentificacionRegistro;
      user.lastname = this.apellido;
      user.name = this.nombre;
      user.password = this.clave;
      let roleEntity = new RolEntity();
      roleEntity.roleId = 3;
      user.roleEntity = roleEntity;
          
      this.generalService.save(user).subscribe(data=>{
        if(data.status === 201){
          this.messageService.add({severity:'success', summary:'Agregado Correctamente'});
          this.limpiarCampos();
        }else{
          if(data.message === 'Email'){
            this.messageService.add({severity:'error', summary:'Correo ya registrado.'});
          }
          if(data.message === 'Identification'){
            this.messageService.add({severity:'error', summary:'Cédula ya registrada.'});
          }
        }      
      })
    }else{
      this.messageService.add({severity:'error', summary:'Contraseña incorrecta'});
    }
  }

  limpiarCampos(){
    this.nombre = "";
    this.apellido = "";
    this.numeroIdentificacionRegistro = "";
    this.clave = "";
    this.claveConfirmarRegistro = "";
    this.email = "";
  }

}
