import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem, MessageService, PrimeIcons} from 'primeng/api';
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
import { ConfirmacionDialog } from '../dialog/confirmacionDialog';


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
  label5: string;

  showFilter: boolean = false;
  showFilterText: string = "Mostrar Filtros"

  mostrando: string = 'Todos';

  hojasDeVida: ResumeEntity[] = [];
  hojasDeVidaAll: ResumeEntity[] = [];
  lista: AnswerEntity[] = [];
  preguntas: QuestionsEntity[];
  statusCount: Number[];
  chartOptions: any;

  events: any[];

  items: MenuItem[];
  
  nombre: string | undefined;

  constructor(private router: Router,
    private messageService: MessageService,
    private hojaDeVidaService: HojaDeVidaService,
    private generalService: GeneralService,
    private preguntasService: PreguntasService,
    public dialog: MatDialog) { }

  ngOnInit(): void {        
    this.cargarDatos();
    this.cargarContadores();    
  }

  changeFilterStatus(){
    this.showFilter = !this.showFilter;
    this.showFilterText = this.showFilter ? "Ocultar Filtros" : "Mostrar Filtros";
  }

  eliminarDialog(hojaDeVida: ResumeEntity){
    const dialogRef =  this.dialog.open(ConfirmacionDialog, {      
      data: {
        mensaje: '¿Esta seguro que desea eliminar este registro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        if(result == "SI"){
          this.eliminar(hojaDeVida);
        }
      }
    });  

  }

  eliminar(hojaDeVida: ResumeEntity){
    let request = new RequestEntity();
    request.id = hojaDeVida.resumeId;
    this.hojaDeVidaService.delete(request).subscribe((data)=>{
      if(data.status == 204){
        this.generalService.mostrarMensaje("Se eliminó correctamente la hoja de vida.", "success");
        this.cargarDatos();
      }else{
        this.generalService.mostrarMensaje("Error eliminado la hoja de vida.", "danger");
      }
    })
  }

  cargarContadores() {
    let tipo = "";
    if(this.hojaDeVidaService.obtenerUserLogin()!.roleEntity.roleId == 2){
      tipo = "userCreate"
    }
    if(this.hojaDeVidaService.obtenerUserLogin()!.roleEntity.roleId == 3){
      tipo = "userAssign"
    }
    if(this.hojaDeVidaService.obtenerUserLogin()!.roleEntity.roleId == 1){
      tipo = "admin"
    }
    this.hojaDeVidaService.recCount(this.hojaDeVidaService.obtenerUserLogin()!.userId, tipo).subscribe(data =>{
      this.statusCount = data.result;      
      this.label1 = this.statusCount[0] === undefined || this.statusCount[0] === null ? 'Registrados: ' + 0 : 'Registrados: ' + this.statusCount[0];
      this.label2 = this.statusCount[1] === undefined || this.statusCount[1] === null ? 'En Espera: ' + 0 : 'En Espera: ' + this.statusCount[1];
      this.label3 = this.statusCount[2] === undefined || this.statusCount[2] === null ? 'En proceso: ' + 0 : 'En proceso: ' + this.statusCount[2];
      this.label4 = this.statusCount[3] === undefined || this.statusCount[3] === null ? 'Revisado: ' +  0 : 'Revisado: ' + this.statusCount[3];
      this.label5 = this.statusCount[4] === undefined || this.statusCount[4] === null ? 'Terminado: ' +  0 : 'Terminado: ' + this.statusCount[4];
    })
  }

  cargarDatos(){    
    this.cargando = true;

    this.nombre = this.hojaDeVidaService.obtenerUserLogin()?.name;
    //Se asigna el rol del usuario
    this.rol = this.hojaDeVidaService.obtenerUserLogin()!.roleEntity.roleId ;

    //Se busca las pregunta
    this.preguntasService.findCount().subscribe((data)=>{
      this.totalQuestions = parseInt(data.result.toString(), 10);
    })
    
    let user = new UserEntity();
    user.userId = this.hojaDeVidaService.obtenerIdUser();    
    if(this.rol == 2){
      this.hojaDeVidaService.findByUserCreate(user).subscribe((data)=>{
        if(data.result.length === 0){
          this.messageService.add({severity:'info', summary:'No se encontraron hojas de vidas registradas'});
          this.hojasDeVida = data.result;
        }else{
          this.hojasDeVida = data.result;
          this.hojasDeVidaAll = this.hojasDeVida;
        }      
        this.cargando = false;
      })
    } else if(this.rol == 1) {
      this.hojaDeVidaService.findAll(user).subscribe((data)=>{
        if(data.result.length === 0){
          this.messageService.add({severity:'info', summary:'No hay hojas de vida para asignar.'});
        }else{
          this.hojasDeVida = data.result;
          this.hojasDeVidaAll = this.hojasDeVida;        
        }      
        this.cargando = false;
      })
    }else if(this.rol == 3){
      this.hojaDeVidaService.findByUserAssign(user).subscribe((data)=>{
        if(data.result.length === 0){
          this.messageService.add({severity:'info', summary:'Ups! No se encontraron hojas de vidas para revisar.'});
        }else{
          this.hojasDeVida = data.result;
          this.hojasDeVidaAll = this.hojasDeVida;
        }      
        this.cargando = false;
      })
    }
    
  }

  filtroPorEstados(filtro: number){    
    let texto = "";
    switch(filtro){
      case 1:
        this.mostrando = 'Todos';
        texto = 'A'
        break;
      case 2:
        this.mostrando = 'Registrados';
        texto = 'S'
        break;
      case 3:
        this.mostrando = 'En Espera';
        texto = 'W'
        break;
      case 4:
        this.mostrando = 'En Proceso';
        texto = 'P'
        break;
      case 5:
        this.mostrando = 'Revisados';
        texto = 'C'
        break;
      case 6:
        this.mostrando = 'Terminados';
        texto = 'F'
        break;
    }
    
    // 1 - TODOS
    // 2 - REGISTRADOS
    // 3 - EN ESPERA
    // 4 - EN PROCESO
    // 5 - REVISADO
    // 6 - TERMINADO

    this.hojasDeVida = [];

    this.hojasDeVidaAll.map((item)=>{
      if(texto === 'A'){
        this.hojasDeVida.push(item);
      } else if(item.recommendation === texto){
        this.hojasDeVida.push(item);
      }
    })
  }

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
  seleccionRecomendacion: any;
  rol: number | undefined;
  habilitarRecomendacion: boolean = false;
  recomendacion: any[] = [
    {
      id: '1',
      name: 'Apto'
    },
    {
      id: '2',
      name: 'No Apto'
    }
  ];

  //maxInput: number = 255;
  maxInput: number = 255;
  cantInput: number = 0;
  observacion: string = "";
  constructor(public dialogRef: MatDialogRef<RegistrarDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private hojaDeVidaService: HojaDeVidaService,
    private generalService: GeneralService,
    private router: Router){}

  ngOnInit(): void {    
    this.rol = this.hojaDeVidaService.obtenerUserLogin()?.roleEntity.roleId;
    
    if(this.data.hojaDeVida.recommendation === 'C'){
      this.habilitarRecomendacion = true;
    }
    if(this.hojaDeVidaService.obtenerUserLogin()?.roleEntity.roleId == 2){
      // entra como cliente
      this.data.hojaDeVida.adminObservation = this.data.hojaDeVida.adminObservation == null || this.data.hojaDeVida.adminObservation == '' ? "" : this.data.hojaDeVida.adminObservation; 
      if(this.data.hojaDeVida.adminObservation.length > 0){
        this.observacion = this.data.hojaDeVida.adminObservation;
        this.validarCaracteres(this.observacion);
      }      
    }else{
      this.data.hojaDeVida.provObservation = this.data.hojaDeVida.provObservation == null || this.data.hojaDeVida.provObservation == '' ? "" : this.data.hojaDeVida.provObservation; 
      if(this.data.hojaDeVida.provObservation.length > 0){
        this.observacion = this.data.hojaDeVida.provObservation;
        this.validarCaracteres(this.observacion);
      }
    }
  }

  guardar(){
    if(this.hojaDeVidaService.obtenerUserLogin()?.roleEntity.roleId == 3){
      this.data.hojaDeVida.provObservation = this.observacion;
    } else if(this.hojaDeVidaService.obtenerUserLogin()?.roleEntity.roleId == 1){
      this.data.hojaDeVida.adminObservation = this.observacion;
    }
    if(this.habilitarRecomendacion){
      this.data.hojaDeVida.status = this.seleccionRecomendacion.name;
    }
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

  profiles : any[];

constructor(public dialogRef: MatDialogRef<RegistrarDialog>, 
  @Inject(MAT_DIALOG_DATA) public data: MatDialogModule,
  private hojaDeVidaService: HojaDeVidaService,
  private generalService: GeneralService,
  private router: Router){
    this.profiles = [
      {name: 'Profesional Sin Experiencia'},
      {name: 'Profesional'},
      {name: 'Técnico'},
      {name: 'Tecnólogo'},
      {name: 'Administrativo'},
      {name: 'Recursos Humanos'}
  ];

  }

  numeroIdentificacionRegistro: number;
  nombre: string;
  selectedProfile: any;
  centro: string;
  unidad: string;

crear(){  
  let resumeEntity = new ResumeEntity();
  resumeEntity.name = this.nombre;
  resumeEntity.numberId = this.numeroIdentificacionRegistro+""; 
  resumeEntity.verified = 0;  
  resumeEntity.profile = this.selectedProfile.name;
  resumeEntity.costCenter = this.centro;
  resumeEntity.bussUnit = this.unidad;
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

