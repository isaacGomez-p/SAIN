import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RequestEntity } from 'src/app/model/requestEntity';
import { RolEntity } from 'src/app/model/rolEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { GeneralService } from 'src/app/service/general/general.service';
import { HojaDeVidaService } from 'src/app/service/hojaDeVida/hoja-de-vida.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre: string;
  apellido: string;
  numeroIdentificacionRegistro: string;
  clave: string = "";
  claveConfirmarRegistro: string;
  rolRegistro: RolEntity;  
  email: string = "";
  claveActual: string;

  constructor(private generalService:GeneralService,
    private messageService : MessageService,
    private hojaDeVidaService: HojaDeVidaService
    ) { }    

  ngOnInit(): void {
    this.cargarCampos();
  }

  registrar(){

    if(this.clave == this.claveConfirmarRegistro){    
      let user = new UserEntity();
      user.userId = this.hojaDeVidaService.obtenerUserLogin()?.userId;
      user.email = this.email;
      user.identification = this.numeroIdentificacionRegistro;
      user.lastname = this.apellido;
      user.name = this.nombre;
      user.password = this.clave;
      user.pass = this.claveActual;

      let roleEntity = new RolEntity();
      roleEntity.roleId = 3;
      user.roleEntity = roleEntity;
          
      this.generalService.update(user).subscribe(data=>{
        if(data.status === 200){
          this.messageService.add({severity:'success', summary:'Modificado Correctamente.'});
          this.cargarCampos();
        }else{                    
          this.messageService.add({severity:'error', summary:'Error al validar la información.'});
        }      
      })
    }else{
      this.messageService.add({severity:'error', summary:'Contraseña incorrecta'});
    }
  }

  cargarCampos(){

    let requestEntity = new RequestEntity();
    requestEntity.id = this.hojaDeVidaService.obtenerUserLogin()?.userId ;

    this.generalService.findUser(requestEntity).subscribe((data)=>{
      if(data.status === 200){
        this.nombre = JSON.parse(JSON.stringify(data.result)).name;
        this.apellido = JSON.parse(JSON.stringify(data.result)).lastname;
        this.numeroIdentificacionRegistro = JSON.parse(JSON.stringify(data.result)).identification;        
        this.email = JSON.parse(JSON.stringify(data.result)).email;        
      }else{

      }
    })
    
    this.clave = "";
    this.claveActual = "";
    this.claveConfirmarRegistro = "";

  }


}
