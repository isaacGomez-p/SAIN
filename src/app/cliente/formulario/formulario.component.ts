import { Component, OnInit, Inject } from '@angular/core';
import { AnswerEntity } from 'src/app/model/answerEntity';
import { QuestionsEntity } from 'src/app/model/questionsEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { RespuestaService } from 'src/app/service/respuesta/respuesta.service';
import { HojaDeVidaService } from 'src/app/service/hojaDeVida/hoja-de-vida.service';
import { PreguntasService } from 'src/app/service/preguntas/preguntas.service';
import { GeneralService } from 'src/app/service/general/general.service';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/model/dialogData';
import { ResumeAnswerDTO } from 'src/app/model/resumeAnswerDTO';
import { MessageService } from 'primeng/api';

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
  habilitarEditar: boolean = false;
  rol: number = 0;
  preguntas: QuestionsEntity[];
  
  constructor(
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
    }else{
      this.adding = 0;
    }
    this.cargarPreguntas(0);    
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
      this.cargarDatosHojaDeVida();
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

  //Revisar que si la pregunta que ya tiene una respuesta
  cargarDatosHojaDeVida(){
    //Inicia los valores negativos por defecto
    this.preguntas.map(itemP=>{      
      itemP.answerObjeto = new AnswerEntity();
      itemP.answerObjeto.result = false;
      itemP.answerObjeto.verified = false;      
    })

    if(this.hojaDeVidaService.obtenerResume() != undefined 
        && this.hojaDeVidaService.obtenerResume() != null 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities != undefined 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities.length > 0){  

      this.hojaDeVidaService.obtenerResume()?.answerEntities.map((item)=>{
        console.log(JSON.stringify(item));
        
        this.preguntas.map(itemP=>{
          //Verifica que el id pregunta este registrado en la hoja de vida, para asignar respuesta
          if(item.questions.questionId == itemP.questionId){       
            itemP.answerObjeto = new AnswerEntity();
            itemP.answerObjeto.verified = item.verified == null || item.verified == undefined ? false : item.verified;
            itemP.answerObjeto.userMod = item.userMod;
            itemP.answerObjeto.verifiedDate = item.verifiedDate;
            itemP.answerObjeto.result = item.result == null || item.result == undefined ? false : item.result;
            itemP.answerObjeto.answerId = item.answerId;
            itemP.answer = item.description;
            itemP.answerObjeto.observation = item.observation == null || item.observation == undefined ? "" : item.observation;
          }
        })
      })
    }   

    this.cargarDatoUltimaSeccion();
  }

  siguiente(){
    this.cargando = false;    
    //Se llama al metodo para guardar las respuestas
    this.guardarRespuestas();

    if(this.section === this.seccionMayor){
      this.btnText = "Finalizar";
    }
  }  

  aumentarSeccion(){
    this.section++;
  }

  guardarRespuestas(){                
    //Obteniendo la hoja de vida
    let resume = this.hojaDeVidaService.obtenerResume();
    //Se inicia la lista de respuestas en caso que sea null
    resume!.answerEntities = [];

    this.preguntas.map((item)=>{      
      if(item.section == this.section && item.answer != null && item.answer != ""){
        let answerEntity = new AnswerEntity();
        //Adding 1 es editar
        if(this.adding === 1){          
          answerEntity.answerId = item.answerObjeto.answerId          
          answerEntity.result = item.answerObjeto.result;                    
          answerEntity.verified = item.answerObjeto.verified;          
        }
        //Se asigna el id de la pregunta
        let questionsEntity = new QuestionsEntity();
        questionsEntity.questionId = item.questionId;        
        answerEntity.questions = questionsEntity;
        answerEntity.description = item.answer; //Asigna la respuesta
        answerEntity.creationDate = new Date();

        if(item.answerObjeto == null || item.answerObjeto == undefined || item.answerObjeto.answerId == null || item.answerObjeto.answerId){
          
        }else{
          answerEntity.answerId = item.answerObjeto.answerId;
        }

        //Se asigna el usuario que modifico la respuesta
        if(resume?.userCreate){
          let user = new UserEntity();
          user = resume?.userCreate;
          answerEntity.userMod = user;
        }
        
        resume!.answerEntities.push(answerEntity);
        resume!.userBy = this.hojaDeVidaService.obtenerUserLogin();
        let resumeAnswerDTO = new ResumeAnswerDTO();
        resumeAnswerDTO.answerEntity = answerEntity;
        resumeAnswerDTO.resumeEntity = resume!;
        this.answerService.update(resumeAnswerDTO).subscribe((data)=>{          
          if(data != null){
            if(data.status === 200){
              item.answerObjeto = JSON.parse(JSON.stringify(data.result));              
            }
          }
        })        
      }
    })

    //Se valida que la sección que esta actualmente sea la ultima, si es así se retorna a la hoja de vida
    if(this.section >= this.seccionMayor){
      this.generalService.navegar("hojaDeVida")
    } else{
      this.aumentarSeccion();
    }
  }
/*
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
        resume!.userBy = this.hojaDeVidaService.obtenerUserLogin();
        //resume!.userAssign = null;
      }
    })
    this.hojaDeVidaService.save(resume!).subscribe((data)=>{
      if(data != null){
        if(data.status === 201){
          this.generalService.navegar("hojaDeVida")
        }
      }
    })
  }*/

  getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  anterior(){    
    this.btnText = "Siguiente";
    if(this.section !== 0){
      this.section--;
      this.cargarSeccionAnterior(this.section);
    }       
  }

  back(){
    this.guardarRespuestas();
    this.generalService.navegar("hojaDeVida")
  }

  verObservacion(answer : AnswerEntity){
    const dialogRef = this.dialog.open(ObservacionDialog, {      
      data: {
        answer: answer
      },
      width: '50%'
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
    private answerService: RespuestaService,
    private hojaDeVidaService: HojaDeVidaService,
    private messageService: MessageService){}

  ngOnInit(): void {
    this.observacion = this.data.answer.observation;
  }

  guardar(){
    let resume = this.hojaDeVidaService.obtenerResume();
    this.data.answer.observation = this.observacion;
    let resumeAnswerDTO = new ResumeAnswerDTO();
    resumeAnswerDTO.answerEntity = this.data.answer;
    resumeAnswerDTO.resumeEntity = resume!;
    this.answerService.update(resumeAnswerDTO).subscribe((data)=>{          
      if(data != null){
        if(data.status === 200){
          this.messageService.add({severity:'success', summary:'Observacion actualizada.'});
          this.cerrarDialog();
        }
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