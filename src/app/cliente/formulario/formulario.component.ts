import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AnswerEntity } from 'src/app/model/answerEntity';
import { QuestionsEntity } from 'src/app/model/questionsEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { HojaDeVidaService } from 'src/app/service/hoja-de-vida.service';
import { RespuestaService } from 'src/app/service/respuesta/respuesta.service';
import { ResumeEntity } from 'src/app/model/resumeEntity';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  section: number = 1;
  cargando: boolean = false;
  btnText: string = "Siguiente";
  listaRespuestas: AnswerEntity[] = [];

  campo : string = "algo";

  preguntas = [
    {
      id: 1,     
      descripcion: "Como se llama",   
      height: 1,
      section: 1,
      answer: "",
      tipo: 'text'
    },
    {
      id: 2,     
      descripcion: "Edad",      
      height: 1,
      section: 1,
      answer: "",
      tipo: 'number'
    },
    {
      id: 3,     
      descripcion: "Antecedentes",      
      height: 5,
      section: 2,
      answer: "",
      tipo: 'text'
    },
    {
      id: 4,     
      descripcion: "Aspiración salarial",      
      height: 1,
      section: 2,
      answer: "",
      tipo: 'moneda'
    },
    {
      id: 5,     
      descripcion: "Enfermedades",      
      height: 2,
      section: 2,
      answer: "",
      tipo: 'text'
    },
  ]

  constructor(private respuestaService: RespuestaService,
    private hojaDeVidaService: HojaDeVidaService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.cargarDatosHojaDeVida();
    if(window.localStorage.getItem("idHV") !== null){
      console.log("algooo" + Number(JSON.parse(window.localStorage.getItem("idHV") || '0')));
      let id = Number(JSON.parse(window.localStorage.getItem("idHV") || '0'));
      this.preguntas.map((pregunta) => {
        let lista2 : [] = JSON.parse(window.localStorage.getItem("hv")  || '{}');
          lista2.map((resume) =>{
            if(id ===  Number(resume['id'])){
              console.log("algo")
              let list3: AnswerEntity[] = resume['list']
              list3.map((answer) => {                
                  pregunta.answer = answer.description;                              
              })
            }
          })    
      })
    }
  }

  cargarDatosHojaDeVida(){
    /*this.respuestaService.get(1).subscribe(data=>{
      if(data.status === 200){
        this.preguntas.map((item)=>{
          data.result.map((itemD)=>{
            if(item.id === itemD.question_id){
              item.answer = itemD.description;
            }
          })          
        })
      }
    })*/
  }

  siguiente(){
    this.cargando = false;
    if(this.section <= 2){
      this.preguntas.map((item)=>{
        if(item.answer !== null && this.section == item.section){
          let respuesta = new AnswerEntity();
          respuesta.description = item.answer.toString();
          let question = new QuestionsEntity();
          question.questionId = item.id;
          respuesta.questions = question;
          respuesta.hojaDeVida = this.hojaDeVidaService.obtenerIdHojaDeVida();
          let user = new UserEntity();
          user.userId = this.hojaDeVidaService.obtenerIdUser();
          respuesta.user = user;
          respuesta.verified = false;
          console.log(respuesta)        
          //his.listaRespuestas.push(respuesta);       
          if(window.localStorage.getItem("lis") === null){
            this.listaRespuestas.push(respuesta);
          } else {
            this.listaRespuestas = JSON.parse(window.localStorage.getItem("lis")  || '{}');
            this.listaRespuestas.push(respuesta);         
            window.localStorage.setItem("lis", JSON.stringify(this.listaRespuestas));   
          }
                      /*let nuevo = {
              id: 3,
              description : "Maria Prieto",
              estado: 'Espera',
              user : {
                  userId : 1
              }      
            }
          this.hojasDeVida.push(nuevo);*/
          /*this.respuestaService.save(respuesta).subscribe((data)=>{
            console.log(data)
            if(data.status === 201){
              
            }else{
  
            }
          })*/
        }
      })  
      if(window.localStorage.getItem("lis") === null){
        console.log("nulo")
        window.localStorage.setItem("lis", JSON.stringify(this.listaRespuestas));
      }      
    } 
    this.section++;
    if(this.section == 3){
      let nuevo = {
        id: this.getRandomArbitrary(0,100000),
        description : this.listaRespuestas[this.listaRespuestas.length-5].description,
        estado: 'Espera',
        user : {
          userId : 1
        },
        creationDate : new Date(),
        list : this.listaRespuestas
      }
      /*let nuevoHV = new ResumeEntity();
      nuevoHV.name = this.listaRespuestas[0].description;
      nuevoHV.answerEntities = this.listaRespuestas;
      nuevoHV.
      nuevoHV.status = 'Espera';*/
      let hvv : any[] = JSON.parse(window.localStorage.getItem("hv")  || '{}');
      hvv.push(nuevo);
      window.localStorage.setItem("hv", JSON.stringify(hvv));
      this.router.navigate(["/hojaDeVida"], {skipLocationChange:true})
    }    
    this.btnText = "Finalizar";
    //console.log("sec")
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  anterior(){
    this.btnText = "Siguiente";
    this.section--;
  }
}