import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AnswerEntity } from 'src/app/model/answerEntity';
import { QuestionsEntity } from 'src/app/model/questionsEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { RespuestaService } from 'src/app/service/respuesta/respuesta.service';
import { ResumeEntity } from 'src/app/model/resumeEntity';
import { HojaDeVidaService } from 'src/app/service/hojaDeVida/hoja-de-vida.service';
import { PreguntasService } from 'src/app/service/preguntas/preguntas.service';
import { GeneralService } from 'src/app/service/general/general.service';


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
  
  seccionMayor:number=0;
  registrar: boolean = false;
  campo : string = "algo";
  //TODO perfil operativo
  /*preguntas = [
    {
      id: 1,     
      descripcion: "Nombre",   
      height: 1,
      section: 1,
      answer: "",
      tipo: 'text',
      verified: "si",
      date: new Date(),
      por: "Proveedor 1",
      resultado : false
    },
    {
      id: 2,     
      descripcion: "Edad",      
      height: 1,
      section: 1,
      answer: "",
      tipo: 'text',
      verified: "no",
      date: new Date(),
      por: "Proveedor 1",
      resultado : false
    },
    {
      id: 3,     
      descripcion: "Antecedentes",      
      height: 5,
      section: 1,
      answer: "",
      tipo: 'text',
      verified: "si",
      date: new Date(),
      por: "Proveedor 2",
      resultado : false
    },
    {
      id: 4,     
      descripcion: "Referencia familiar",      
      height: 1,
      section: 2,
      answer: "",
      tipo: 'text',
      verified: "no",
      date: new Date(),
      por: "Proveedor 2",
      resultado : false
    },
    {
      id: 5,     
      descripcion: "Enfermedades",      
      height: 2,
      section: 2,
      answer: "",
      tipo: 'text',
      verified: "si",
      date: new Date(),
      por: "Proveedor 3",
      resultado : false
    },
  ]
*/
  preguntas: QuestionsEntity[];
  
  constructor(private respuestaService: RespuestaService,
    private hojaDeVidaService: HojaDeVidaService,
    private generalService: GeneralService,    
    private preguntasService: PreguntasService,    
    ) { }

  ngOnInit(): void {      
    console.log(this.hojaDeVidaService.obtenerResume())
    if(this.hojaDeVidaService.estaEditando() !== null && this.hojaDeVidaService.estaEditando() == true) {
      this.adding = 1;
    }else{
      this.adding = 0;
    }
    this.cargarPreguntas();    
  }

  cargarPreguntas(){    
    this.preguntasService.findAl().subscribe((data)=>{
      console.log(data)
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
  }

  cargarDatosHojaDeVida(){    

    this.preguntas.map((item)=>{          
      if(item.section === 0 && item.description === "Nombre"){                      
        item.answer = this.hojaDeVidaService.obtenerResume()!.name
      }
    })    
    
    if(this.hojaDeVidaService.obtenerResume() != undefined 
        && this.hojaDeVidaService.obtenerResume() != null 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities != undefined 
        && this.hojaDeVidaService.obtenerResume()!.answerEntities.length > 0){          
      this.hojaDeVidaService.obtenerResume()?.answerEntities.map((item)=>{        
        console.log("anserss?" + JSON.stringify(item));
        this.preguntas.map(itemP=>{
          console.log("?b?" + JSON.stringify(itemP));
          if(item.questions.questionId == itemP.questionId){
            console.log("pregunta" + JSON.stringify(item));
            itemP.answerObjeto = new AnswerEntity();
            itemP.answerObjeto.verified = item.verified;
            itemP.answerObjeto.userMod = item.userMod;
            itemP.answerObjeto.verifiedDate = item.verifiedDate;
            itemP.answerObjeto.result = item.result;
            itemP.answerObjeto.answerId = item.answerId;
            itemP.answer = item.description;
  //          itemP.answerObjeto.
          }else{
            itemP.answerObjeto = new AnswerEntity();
            itemP.answerObjeto.result = false;
          }
        })
        
      })
    }

    this.cargarDatoUltimaSeccion();

  }

  siguiente(){
    
    console.log(this.preguntas)

    this.cargando = false;
    if(this.section > this.seccionMayor){
        
    } else{
      this.section++;  
    }
    
    console.log(this.section);    
    console.log("datos actuales" + JSON.stringify(this.preguntas))


    if(this.section === this.seccionMayor){
      console.log("________");
      this.registrar = true;
      this.btnText = "Finalizar";
    }

  }  

  registrarPreguntas(){
        
    let resume = this.hojaDeVidaService.obtenerResume();    
    //Se inicia la lista de respuestas en caso que sea null
    resume!.answerEntities = [];    
    this.preguntas.map((item)=>{
      if(item.answer != null && item.answer != ""){
        let answerEntities = new AnswerEntity();
        console.log("___________ 1");
        
        if(this.adding === 1){                              
          console.log("___________ 2");
          answerEntities.answerId = item.answerObjeto.answerId          
          answerEntities.result = item.answerObjeto.result;          
          console.log(answerEntities.verified);          
          resume!.resumeId = this.hojaDeVidaService.obtenerIdHojaDeVida();
        }else{
          console.log("___________ 3");
          answerEntities.verified = false;
        }
        console.log("___________ 4");
        //Se asigna el id de la pregunta
        let questionsEntity = new QuestionsEntity();
        questionsEntity.questionId = item.questionId;
        answerEntities.questions = questionsEntity;
        answerEntities.description = item.answer; //Asigna la respuesta
        answerEntities.creationDate = new Date();
        if(resume?.userCreate){
          let user = new UserEntity();
          user = resume?.userCreate;
          answerEntities.userMod = user;
        }        
        resume!.answerEntities.push(answerEntities);
        //resume?.userAssign = 
      }
    })    
    console.log(resume)
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
      this.registrar = false;
    }    
    
  }
}