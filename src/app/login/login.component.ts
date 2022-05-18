import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  paso = 1;

  numeroIdentificacion: number;
  clave: string;

  //Registro
  nombre: string;
  apellido: string;
  numeroIdentificacionRegistro: string;
  claveRegistro: string;
  claveConfirmarRegistro: string;
  rolRegistro: string;  

  rol = [
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
    private router: Router) { }

  ngOnInit(): void {
    
  }

  iniciarSesion(){    
    this.router.navigate(["/revision"], {skipLocationChange:true})    
    if(this.numeroIdentificacion == null || this.numeroIdentificacion == undefined){
      this.messageService.add({severity:'error', summary:'Por favor ingrese un número de identificación'});
      return;
    }
    if(this.clave == null || this.clave == undefined){
      this.messageService.add({severity:'error', summary:'Por favor ingrese una contraseña'});
      return;
    }
    
  }

  procesoRegistrar(){
    this.paso = 2;
  }

  volver(){
    this.paso = 1;
  }

  registrar(){
    console.log(this.nombre)
    console.log(this.apellido)
    console.log(this.numeroIdentificacionRegistro)
    console.log(this.rolRegistro)
    console.log(this.claveRegistro)
    console.log(this.claveConfirmarRegistro)

  }

}
