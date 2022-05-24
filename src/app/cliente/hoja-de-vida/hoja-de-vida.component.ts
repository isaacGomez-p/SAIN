import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService, PrimeIcons} from 'primeng/api';
import { ResumeEntity } from 'src/app/model/resumeEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { AnswerEntity } from 'src/app/model/answerEntity';
import { HojaDeVidaService } from 'src/app/service/hojaDeVida/hoja-de-vida.service';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from 'src/app/service/general/general.service';


@Component({
  selector: 'app-hoja-de-vida',
  templateUrl: './hoja-de-vida.component.html',
  styleUrls: ['./hoja-de-vida.component.css']
})
export class HojaDeVidaComponent implements OnInit {

  cargando: boolean = false;

  /*hojasDeVida = [
    {
      id: 1,
      description : "Eduardo Fierro",
      estado: 'Espera',
      user : {
          userId : 1
      }      
    },
    {
      id: 2,
      description : "Carlos Tinoco",
      estado: 'Espera',
      user : {
          userId : 2
      }      
    }
  ]*/

  hojasDeVida: ResumeEntity[] = [];
  lista: AnswerEntity[] = []


  events: any[];

  
  constructor(private router: Router,
    private messageService: MessageService,
    private hojaDeVidaService: HojaDeVidaService,
    private generalService: GeneralService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarDatos();
    //this.cargarDatosDebug();
    this.events = [
      {status: 'Registrados: 15', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
      {status: 'Espera: 10', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
      {status: 'Verificado: 3', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
      {status: 'Terminado: 18', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
    ];

    /*window.localStorage.removeItem("idHV");
    if(window.localStorage.getItem("hv") !== null){
      this.hojasDeVida = JSON.parse(window.localStorage.getItem("hv")  || '{}');
    }*/
  }

  cargarDatos(){
    this.cargando = true;
    let user = new UserEntity();
    user.userId = this.hojaDeVidaService.obtenerIdUser();    
    this.hojaDeVidaService.findByUser(user).subscribe((data)=>{
      if(data.result.length === 0){
        this.messageService.add({severity:'info', summary:'No se encontraron hojas de vidas'});
      }else{
        this.hojasDeVida = data.result;
      }      
      this.cargando = false;
      console.log(data);
    })
  }

  cargarDatosDebug(){
    let usuario = new UserEntity();        
    this.hojasDeVida.push(
      {      
        name: 'Eduardo Fierro',
        numberId: '10005465',
        verified: false,
        verificationDate: new Date(),
        userBy: {
          userId: 1,
          name: 'Isacc',
          email: '',
          identification: '',
          lastname: '',
          password: '',
          role: 1,
        },
        recommendation: 'Contratar',
        creationDate: new Date(),
        observation: 'Ninguna',
        process: '',
        score: 100,
        resumeId: 1,
        status: '',
        userAssign: usuario,
        userCreate: usuario,
        answerEntities: this.lista
      }
    )
  }

  verHojaDeVida(hojaDeVida: ResumeEntity){
    console.log(hojaDeVida)
    this.hojaDeVidaService.guardarIdHojaDevida(hojaDeVida.resumeId);
    this.hojaDeVidaService.guardarResume(hojaDeVida);    
    this.hojaDeVidaService.guardarEstaEditando(true);
    //window.localStorage.setItem("idHV", id.toString());
    this.generalService.navegar("formulario");    
  }

  agregar(){
    //let resume = new ResumeEntity();
    //resume.
    //this.hojaDeVidaService.save()
    this.hojaDeVidaService.guardarResume(null);
    const dialogRef = this.dialog.open(RegistrarDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });    
    //window.localStorage.setItem("hv", JSON.stringify(this.hojasDeVida));
    //
  }

}


@Component({
  selector: 'dialog-registrar',
  templateUrl: 'dialog-registrar.html',
})
export class RegistrarDialog {

  constructor(public dialogRef: MatDialogRef<RegistrarDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: MatDialogModule,
    private hojaDeVidaService: HojaDeVidaService,
    private generalService: GeneralService,
    private router: Router){

    }

  numeroIdentificacionRegistro: number;
  nombre: string;

  crear(){
    let resumeEntity = new ResumeEntity();
    resumeEntity.name = this.nombre;
    resumeEntity.numberId = this.numeroIdentificacionRegistro+""; 
    resumeEntity.verified = false;
    resumeEntity.recommendation = "En Espera";
    resumeEntity.status = "W";
    resumeEntity.process = "Perfil 01"
    let user = new UserEntity();  
    user.userId = this.hojaDeVidaService.obtenerIdUser();
    resumeEntity.userCreate = user;
    resumeEntity.userAssign = user;    
    this.hojaDeVidaService.guardarUser(user);
    this.hojaDeVidaService.guardarResume(resumeEntity);
    this.hojaDeVidaService.guardarEstaEditando(false);
    this.cerrarDialog();
    this.generalService.navegar("formulario");    
    /*this.hojaDeVidaService.save(resumeEntity).subscribe((data)=>{
      console.log(data)
      if(data.status === 201){
        let objeto = JSON.parse(JSON.stringify(data.result));
        this.hojaDeVidaService.guardarIdHojaDevida(objeto.resumeId)
        this.cerrarDialog();
        
      }            
    })*/
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}