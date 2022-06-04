import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'
import { AppComponent } from '../app.component';
import { Rol } from '../model/rol';
import { UserEntity } from '../model/userEntity';
import { GeneralService } from '../service/general/general.service';
import { HojaDeVidaService } from '../service/hojaDeVida/hoja-de-vida.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  paso = 1;

  emailLogin: string;
  clave: string;

  //Registro
  nombre: string;
  apellido: string;
  numeroIdentificacionRegistro: string;
  claveRegistro: string;
  claveConfirmarRegistro: string;
  rolRegistro: Rol;  
  emailRegistro: string;

  rol : Rol[] = [
    {
      id: 1,
      nombre: "Cliente"
    },
    {
      id: 2,
      nombre: "Proveedor"
    }
  ]  

  constructor(private messageService: MessageService,
    private appComponent: AppComponent,
    private router: Router,
    private generalService: GeneralService,
    private hojaDeVidaService: HojaDeVidaService) { }

  ngOnInit(): void {
    this.appComponent.inicionSesiada = false;
  }

  iniciarSesion(){   
    //this.hojaDeVidaService.guardarIdUser(1);
      
    
    if(this.emailLogin == null || this.emailLogin == undefined){
      this.messageService.add({severity:'error', summary:'Por favor ingrese un número de identificación'});
      return;
    }
    if(this.clave == null || this.clave == undefined){
      this.messageService.add({severity:'error', summary:'Por favor ingrese una contraseña'});
      return;
    }
    
    let user = new UserEntity();
    user.email = this.emailLogin;
    user.password = this.clave;
    //user.email = "proveedor2@email.com";
    //user.password = "123456"
    this.generalService.login(user).subscribe(data=>{
      if(data.status === 200){
        let user = new UserEntity();
        user = data.result as unknown as UserEntity;        
        this.hojaDeVidaService.guardarUserLogin(user);
        this.hojaDeVidaService.guardarIdUser(user.userId);
        console.log(this.hojaDeVidaService.obtenerUserLogin());
        this.messageService.add({severity:'success', summary:'Bienvenido'});     
        this.generalService.navegar("hojaDeVida");      
        this.appComponent.inicionSesiada = true;           
      }else if (data.status === 404 || data.status === 409){
        this.messageService.add({severity:'error', summary:'Datos incorrectos'});
      }      
    })
    
  }

  procesoRegistrar(){
    this.paso = 2;
  }

  volver(){
    this.paso = 1;
  }

  registrar(){

    if(this.claveRegistro == this.claveConfirmarRegistro){    
      let user = new UserEntity();
      user.email = this.emailRegistro;
      user.identification = this.numeroIdentificacionRegistro;
      user.lastname = this.apellido;
      user.name = this.nombre;
      user.password = this.claveRegistro;
      user.roleEntity.roleId = this.rolRegistro.id;
          
      this.generalService.save(user).subscribe(data=>{
        this.messageService.add({severity:'success', summary:'Agregado Correctamente'});
      })

    }else{
      this.messageService.add({severity:'error', summary:'Contraseña incorrecta'});
    }
  }

}
