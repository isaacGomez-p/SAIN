import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { AnswerEntity } from 'src/app/model/answerEntity';
import { QuestionsEntity } from 'src/app/model/questionsEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { RespuestaService } from 'src/app/service/respuesta/respuesta.service';
import { ResumeEntity } from 'src/app/model/resumeEntity';
import { HojaDeVidaService } from 'src/app/service/hojaDeVida/hoja-de-vida.service';
import { PreguntasService } from 'src/app/service/preguntas/preguntas.service';
import { GeneralService } from 'src/app/service/general/general.service';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/model/dialogData';
import { ResumeAnswerDTO } from 'src/app/model/resumeAnswerDTO';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  section: number = 0;
  cargando: boolean = false;
  btnText: string = "Siguiente";
  listaRespuestas: AnswerEntity[] = [];
  adding: number = 0;
  nombre: string | undefined;
  seccionMayor:number=0;
  registrar: boolean = false;
  campo : string = "algo";
  habilitarEditar: boolean = false;
  rol: number = 0;
  preguntas: QuestionsEntity[];
  
  constructor(private respuestaService: RespuestaService,
    private hojaDeVidaService: HojaDeVidaService,
    private generalService: GeneralService,    
    private preguntasService: PreguntasService, 
    private answerService: RespuestaService,
    public dialog: MatDialog   
    ) { }

  ngOnInit(): void {
    this.rol = this.hojaDeVidaService.obtenerUserLogin()!.roleEntity.roleId;    

    if(this.hojaDeVidaService.obtenerUserLogin()!.roleEntity.roleId == 3){      
      this.habilitarEditar = true;
    }else{
      this.habilitarEditar = false;
    }

    this.nombre = this.hojaDeVidaService.obtenerResume()?.name;
    if(this.hojaDeVidaService.estaEditando() !== null && this.hojaDeVidaService.estaEditando() == true) {      
      this.adding = 1;
      //this.cargarRespuestas()
    }else{
      this.adding = 0;
    }
    this.cargarPreguntas(0);    
  }

  cargarRespuestas(){
    this.answerService.findByResume(this.hojaDeVidaService.obtenerResume()).subscribe((data)=>{

    })
  }

  //Cambiar servicio
  getProfile() : string | undefined{
    return this.hojaDeVidaService.obtenerResume()?.profile.substring(5);
  }

  cargarPreguntas(seccion: number){    
    this.preguntasService.findAll(seccion, this.hojaDeVidaService.obtenerUserLogin()!.roleEntity.roleId, this.getProfile()).subscribe((data)=>{
      this.preguntas = data.result;
      this.cargarDatosHojaDeVida();
    })
  }

  cargarSeccionAnterior(seccion: number){
    this.preguntasService.findAll(seccion, this.hojaDeVidaService.obtenerUserLogin()!.roleEntity.roleId, this.getProfile()).subscribe((data)=>{
      this.preguntas = data.result;
      this.cargarDatosHojaDeVidaAnterior();
    })
  }

  cargarDatoUltimaSeccion(){
    this.preguntas.map((item)=>{
      if(item.section>=this.seccionMayor){
        this.seccionMayor = item.section;        
      }
    })    

    if(this.section == this.seccionMayor){
      this.btnText = "Finalizar";      
    }    
  }

  cargarDatosHojaDeVida(){
    if(this.hojaDeVidaService.obtenerResume() != undefined 
        && this.hojaDeVidaService.obtenerResume() != null 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities != undefined 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities.length > 0){  

      this.hojaDeVidaService.obtenerResume()?.answerEntities.map((item)=>{
        this.preguntas.map(itemP=>{
          if(item.questions.questionId == itemP.questionId){
            itemP.answerObjeto = new AnswerEntity();
            itemP.answerObjeto.verified = item.verified == null || item.verified == undefined ? false : item.verified;
            itemP.answerObjeto.userMod = item.userMod;
            itemP.answerObjeto.verifiedDate = item.verifiedDate;
            itemP.answerObjeto.result = item.result == null || item.result == undefined ? false : item.result;
            itemP.answerObjeto.answerId = item.answerId;
            itemP.answer = item.description;
          }else{
            itemP.answerObjeto = new AnswerEntity();
            itemP.answerObjeto.result = false;
            itemP.answerObjeto.verified = false;
          }
        })
      })
    }else{
      this.preguntas.map(itemP=>{
          itemP.answerObjeto = new AnswerEntity();
          itemP.answerObjeto.result = false;
          itemP.answerObjeto.verified = false;
      })
    }
    this.cargarDatoUltimaSeccion();
  }

  cargarDatosHojaDeVidaAnterior(){
    if(this.hojaDeVidaService.obtenerResume() != undefined 
        && this.hojaDeVidaService.obtenerResume() != null 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities != undefined 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities.length > 0){  

      this.hojaDeVidaService.obtenerResume()?.answerEntities.map((item)=>{
        this.preguntas.map(itemP=>{
          if(item.questions.questionId == itemP.questionId){
            itemP.answerObjeto = new AnswerEntity();
            itemP.answerObjeto.verified = item.verified;
            itemP.answerObjeto.userMod = item.userMod;
            itemP.answerObjeto.verifiedDate = item.verifiedDate;
            itemP.answerObjeto.result = item.result;
            itemP.answerObjeto.answerId = item.answerId;
            itemP.answer = item.description;
          }else{
            itemP.answerObjeto = new AnswerEntity();
            itemP.answerObjeto.result = false;
            itemP.answerObjeto.verified = false;
          }
        })
        
      })
    }
    else{
      this.preguntas.map(itemP=>{
          itemP.answerObjeto = new AnswerEntity();
          itemP.answerObjeto.result = false;
          itemP.answerObjeto.verified = false;
      })
    }
  }

  siguiente(){
    this.cargando = false;
    if(this.section >= this.seccionMayor){
        
    } else{
      this.guardarRespuestas();
    }

    if(this.section === this.seccionMayor){
      this.btnText = "Finalizar";
    }
  }  

  guardarRespuestas(){        
    let resume = this.hojaDeVidaService.obtenerResume();
    //Se inicia la lista de respuestas en caso que sea null
    resume!.answerEntities = [];    
    this.preguntas.map((item)=>{
      if(item.section == this.section && item.answer != null && item.answer != ""){
        let answerEntities = new AnswerEntity();
        //Adding 1 es editar
        if(this.adding === 1){
          answerEntities.answerId = item.answerObjeto.answerId          
          answerEntities.result = item.answerObjeto.result;  
          answerEntities.verified = item.answerObjeto.verified;
          resume!.resumeId = this.hojaDeVidaService.obtenerIdHojaDeVida();
        }else{
          answerEntities.verified = false;
        }
        //Se asigna el id de la pregunta
        let questionsEntity = new QuestionsEntity();
        questionsEntity.questionId = item.questionId;
        answerEntities.questions = questionsEntity;
        answerEntities.description = item.answer; //Asigna la respuesta
        answerEntities.creationDate = new Date();
        if(item.answerObjeto == null || item.answerObjeto == undefined || item.answerObjeto.answerId == null || item.answerObjeto.answerId){
          
        }else{
          answerEntities.answerId = item.answerObjeto.answerId;
        }
        if(resume?.userCreate){
          let user = new UserEntity();
          user = resume?.userCreate;
          answerEntities.userMod = user;
        }
        
        resume!.answerEntities.push(answerEntities);
        resume!.userAssign = null;
        //resume?.userAssign = 
        let resumeAnswerDTO = new ResumeAnswerDTO();
        resumeAnswerDTO.answerEntity = answerEntities;
        resumeAnswerDTO.resumeEntity = resume!;
        this.answerService.update(resumeAnswerDTO).subscribe((data)=>{
          if(data != null){
            if(data.status === 200){
              this.cargarPreguntas(this.section);
            }
          }
        })
        this.section++;
      }
    })
   
  }

  registrarPreguntas(){        
    let resume = this.hojaDeVidaService.obtenerResume();
    //Se inicia la lista de respuestas en caso que sea null
    resume!.answerEntities = [];    
    this.preguntas.map((item)=>{
      if(item.answer != null && item.answer != ""){
        let answerEntities = new AnswerEntity();
        //Adding 1 es editar
        if(this.adding === 1){
          answerEntities.answerId = item.answerObjeto.answerId          
          answerEntities.result = item.answerObjeto.result;  
          answerEntities.verified = item.answerObjeto.verified;              
          resume!.resumeId = this.hojaDeVidaService.obtenerIdHojaDeVida();
        }else{
          answerEntities.verified = false;
        }
        //Se asigna el id de la pregunta
        let questionsEntity = new QuestionsEntity();
        questionsEntity.questionId = item.questionId;
        answerEntities.questions = questionsEntity;
        answerEntities.description = item.answer; //Asigna la respuesta
        answerEntities.creationDate = new Date();
        if(item.answerObjeto == null || item.answerObjeto == undefined || item.answerObjeto.answerId == null || item.answerObjeto.answerId){
          
        }else{
          answerEntities.answerId = item.answerObjeto.answerId;
        }
        
        if(resume?.userCreate){
          let user = new UserEntity();
          user = resume?.userCreate;
          answerEntities.userMod = user;
        }        
        resume!.answerEntities.push(answerEntities);
        resume!.userAssign = null;
      }
    })
    this.hojaDeVidaService.save(resume!).subscribe((data)=>{
      if(data != null){
        if(data.status === 201){
          this.generalService.navegar("hojaDeVida")
        }
      }
    })
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  anterior(){    
    this.btnText = "Siguiente";
    if(this.section !== 0){
      this.section--;
      this.cargarPreguntas(this.section);
    }       
  }

  back(){
    this.generalService.navegar("hojaDeVida")
  }

  verObservacion(answer : AnswerEntity){

    const dialogRef = this.dialog.open(ObservacionDialog, {      
      data: {
        answer: answer
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });   
      
  }
}

@Component({
  selector: 'observacion-dialog',
  templateUrl: 'observacion-dialog.html',
})
export class ObservacionDialog implements OnInit {
  seleccionRecomendacion: any;
  rol: number | undefined;

  //maxInput: number = 255;
  maxInput: number = 255;
  cantInput: number = 0;
  observacion: string = "";
  constructor(public dialogRef: MatDialogRef<ObservacionDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private hojaDeVidaService: HojaDeVidaService,
    private generalService: GeneralService,
    private router: Router){}

  ngOnInit(): void {    
    //Cargar observacion de acuerdo con rol
  }

  guardar(){
    console.log(this.data.mensaje)
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

  validarCaracteres(value : any){ 
    //Cuenta el tamaño del texto ingresado   
    this.cantInput = value.length;
  }

}
