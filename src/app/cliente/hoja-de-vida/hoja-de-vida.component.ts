import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService, PrimeIcons} from 'primeng/api';
import { ResumeEntity } from 'src/app/model/resumeEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { AnswerEntity } from 'src/app/model/answerEntity';
import { HojaDeVidaService } from 'src/app/service/hojaDeVida/hoja-de-vida.service';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from 'src/app/service/general/general.service';
import { RequestEntity } from 'src/app/model/requestEntity';
import { DialogData } from 'src/app/model/dialogData';
import { PreguntasService } from 'src/app/service/preguntas/preguntas.service';
import { QuestionsEntity } from 'src/app/model/questionsEntity';


@Component({
  selector: 'app-hoja-de-vida',
  templateUrl: './hoja-de-vida.component.html',
  styleUrls: ['./hoja-de-vida.component.css']
})
export class HojaDeVidaComponent implements OnInit {

  data1 : any;
  cargando: boolean = false;
  totalQuestions : number;
  rol: number = 0;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
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
  lista: AnswerEntity[] = [];
  preguntas: QuestionsEntity[];
  statusCount: Number[];
  chartOptions: any;

  events: any[];

  
  constructor(private router: Router,
    private messageService: MessageService,
    private hojaDeVidaService: HojaDeVidaService,
    private generalService: GeneralService,
    private preguntasService: PreguntasService,
    public dialog: MatDialog) { }

  ngOnInit(): void {        
    this.cargarDatos();
    this.cargarContadores();
    //this.cargarDatosDebug();
   
    
    

    /*window.localStorage.removeItem("idHV");
    if(window.localStorage.getItem("hv") !== null){
      this.hojasDeVida = JSON.parse(window.localStorage.getItem("hv")  || '{}');
    }*/
  }
  
  cargarContadores() {
    let tipo = "";
    if(this.hojaDeVidaService.obtenerUserLogin()!.roleEntity.roleId == 2){
      tipo = "userCreate"
    }
    this.hojaDeVidaService.recCount(this.hojaDeVidaService.obtenerUserLogin()!.userId, tipo).subscribe(data =>{
      this.statusCount = data.result;      

    /*this.data1 = {
        labels: ['Registrados','En Espera','En Proceso', 'Terminado'],
        datasets: [
            {
                data: [
                  *//*,
                  0, 
                  this.statusCount == undefined || this.statusCount == null ? 'En proceso: ' + 0 : 'En proceso: ' + this.statusCount[1],
                  this.statusCount == undefined || this.statusCount == null ? 'Terminado: ' +  0 : 'Terminado: ' + this.statusCount[2]],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                    ]
            }
        ]
    };
    this.chartOptions = this.getLightTheme;*/
      this.label1 = this.statusCount == undefined || this.statusCount == null ?'Registrados: ' + 0 : 'Registrados: ' + this.statusCount[0];
      this.label2 = 'En Espera: 0' ;
      this.label3 = this.statusCount == undefined || this.statusCount == null ? 'En proceso: ' + 0 : 'En proceso: ' + this.statusCount[1];
      this.label4 = this.statusCount == undefined || this.statusCount == null ? 'Terminado: ' +  0 : 'Terminado: ' + this.statusCount[2];
      this.events = [
        {status:  this.statusCount == undefined || this.statusCount == null ?'Registrados: ' + 0 : 'Registrados: ' + this.statusCount[0], date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
        {status: 'Espera: -', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
        {status:  this.statusCount == undefined || this.statusCount == null ? 'En proceso: ' + 0 : 'En proceso: ' + this.statusCount[1], date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
        {status: this.statusCount == undefined || this.statusCount == null ? 'Terminado: ' +  0 : 'Terminado: ' + this.statusCount[2], date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
      ];
    })
  }

  getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
      }
  }

  cargarDatos(){    
    this.cargando = true;

    //Se asigna el rol del usuario
    this.rol = this.hojaDeVidaService.obtenerUserLogin()!.roleEntity.roleId ;

    //Se busca las pregunta
    /*this.preguntasService.findAll().subscribe((data)=>{
      this.preguntas = data.result;
      this.totalQuestions = this.preguntas.length
    })*/
    
    let user = new UserEntity();
    user.userId = this.hojaDeVidaService.obtenerIdUser();    
    if(this.rol == 2){
      this.hojaDeVidaService.findByUserCreate(user).subscribe((data)=>{
        if(data.result.length === 0){
          this.messageService.add({severity:'info', summary:'No se encontraron hojas de vidas registradas'});
        }else{
          this.hojasDeVida = data.result;
        }      
        this.cargando = false;
      })
    } else if(this.rol == 1) {
      this.hojaDeVidaService.findAll(user).subscribe((data)=>{
        if(data.result.length === 0){
          this.messageService.add({severity:'info', summary:'No hay hojas de vida para asignar.'});
        }else{
          this.hojasDeVida = data.result;
        }      
        this.cargando = false;
      })
    }else if(this.rol == 3){
      this.hojaDeVidaService.findByUserAssign(user).subscribe((data)=>{
        if(data.result.length === 0){
          this.messageService.add({severity:'info', summary:'Ups! No se encontraron hojas de vidas para revisar.'});
        }else{
          this.hojasDeVida = data.result;
        }      
        this.cargando = false;
      })
    }
    
  }

  /*cargarDatosDebug(){
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
  }*/

  verHojaDeVida(hojaDeVida: ResumeEntity){
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
    });    
    //window.localStorage.setItem("hv", JSON.stringify(this.hojasDeVida));
    //
  }

  verObservacion(hojaDeVida : ResumeEntity){

    const dialogRef = this.dialog.open(ObservacionDialog, {      
      data: {
        hojaDeVida: hojaDeVida
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });   
      
  }

  asignar(hojaDeVida : ResumeEntity){
    
    const dialogRef = this.dialog.open(AsignarDialog, {
      width: '500px',
      height: '40%',
      data: {
        hojaDeVida: hojaDeVida
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });   
  }

}


@Component({
  selector: 'dialog-asignar',
  templateUrl: 'dialog-asignar.html',
})
export class AsignarDialog implements OnInit{

  proveedores: UserEntity[];
  usuarioSeleccionado: UserEntity;
  
  constructor(public dialogRef: MatDialogRef<RegistrarDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private hojaDeVidaService: HojaDeVidaService,
    private generalService: GeneralService,
    public dialog: MatDialog){

    }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    let rol = new RequestEntity();
    rol.id = 3;
    this.generalService.findByRole(rol).subscribe((data)=>{
      if(data.status === 200){
        this.proveedores = data.result        
      }
    })


  }

  

  cerrarDialog(){
    this.dialogRef.close();
  }



  asignar(){
    
    this.data.hojaDeVida.userAssign = this.usuarioSeleccionado

    this.hojaDeVidaService.save(this.data.hojaDeVida).subscribe(data=>{
      if(data.status === 201){
        this.generalService.mostrarMensaje("success", "Se asignó correctamente.");
        this.cerrarDialog()
      }
    })
   
  }

}

@Component({
  selector: 'observacion-dialog',
  templateUrl: 'observacion-dialog.html',
})
export class ObservacionDialog implements OnInit {

  //maxInput: number = 255;
  maxInput: number = 255;
  cantInput: number = 0;

  constructor(public dialogRef: MatDialogRef<RegistrarDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private hojaDeVidaService: HojaDeVidaService,
    private generalService: GeneralService,
    private router: Router){}

  ngOnInit(): void {
    this.data.hojaDeVida.observation = ""
  }

  guardar(){
    this.hojaDeVidaService.save(this.data.hojaDeVida).subscribe((data)=>{
      if(data.status === 201){
        this.generalService.mostrarMensaje("success", "Observación asignada correctamente.");
        this.cerrarDialog()
      }
    })
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

  validarCaracteres(value : any){ 
    //Cuenta el tamaño del texto ingresado   
    this.cantInput = value.length;
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
  resumeEntity.verified = 0;
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