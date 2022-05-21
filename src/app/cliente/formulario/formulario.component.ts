import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AnswerEntity } from 'src/app/model/answerEntity';
import { QuestionsEntity } from 'src/app/model/questionsEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { RespuestaService } from 'src/app/service/respuesta/respuesta.service';
import { ResumeEntity } from 'src/app/model/resumeEntity';
import { HojaDeVidaService } from 'src/app/service/hojaDeVida/hoja-de-vida.service';


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
  adding: number = 0;
  
  seccionMayor:number=0;
  registrar: boolean = false;
  campo : string = "algo";
//TODO perfil operativo
  preguntas = [
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

  
  constructor(private respuestaService: RespuestaService,
    private hojaDeVidaService: HojaDeVidaService,
    private answerService: RespuestaService,
    private router: Router
    ) { }

  ngOnInit(): void {
   console.log(this.hojaDeVidaService.obtenerIdHojaDeVida())
    this.cargarDatosHojaDeVida();
    if(window.localStorage.getItem("idHV") !== null){
      this.adding = Number(JSON.parse(window.localStorage.getItem("idHV") || '0'));
      console.log("algooo" + Number(JSON.parse(window.localStorage.getItem("idHV") || '0')));
      let id = Number(JSON.parse(window.localStorage.getItem("idHV") || '0'));
      let count : number = 0;
      this.preguntas.map((pregunta) => {
        let lista2 : [] = JSON.parse(window.localStorage.getItem("hv")  || '{}');
          lista2.map((resume) =>{
            if(id ===  Number(resume['id'])){              
              let list3: AnswerEntity[] = resume['list']
              console.log("algo" + JSON.stringify(list3));
              //pregunta.answer = list3[count].description;
              list3.map((answer) => {
                if(pregunta.id === answer.questions.questionId){
                  pregunta.answer = answer.description;
                  pregunta.resultado = answer.questions.resultado;  
                  pregunta.date = new Date();
                  //pregunta.resultado = answer.                            
                  console.log("-" +pregunta.answer);
                }                                  
              })
              //count++;
            }
          })    
      })
    }else{
      this.adding = 0;
    }
  }

  cargarDatoUltimaSeccion(){
    this.preguntas.map((item)=>{
      if(item.section>=this.seccionMayor){
        this.seccionMayor = item.section;
      }
    })
    this.seccionMayor;
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
    console.log("this.adding" + this.adding);   
    this.cargando = false;
    if(this.section <= 2){
      this.preguntas.map((item)=>{
        if(item.answer !== null && this.section == item.section){
          let respuesta = new AnswerEntity();
          respuesta.description = item.answer.toString();
          console.log("respuestaa" + respuesta.description);
          let question = new QuestionsEntity();
          question.questionId = item.id;
          question.resultado = item.resultado;
          respuesta.questions = question;
          question.date = new Date();
          let hojaDeVida = new ResumeEntity();
          hojaDeVida.resumeId = this.hojaDeVidaService.obtenerIdHojaDeVida();
          respuesta.resumes = hojaDeVida;
          let user = new UserEntity();
          user.userId = this.hojaDeVidaService.obtenerIdUser();
          respuesta.userMod = user;
          respuesta.verified = false;
          respuesta.creationDate = new Date();
          console.log(respuesta)        
          //his.listaRespuestas.push(respuesta);       
          if(window.localStorage.getItem("lis") === null){
            this.listaRespuestas.push(respuesta);
          } else {
            this.listaRespuestas = JSON.parse(window.localStorage.getItem("lis")  || '{}');
            this.listaRespuestas.push(respuesta);         
            window.localStorage.setItem("lis", JSON.stringify(this.listaRespuestas));   
          }
          console.log("______________")
          this.answerService.save(respuesta).subscribe((data)=>{
            console.log(data)
          })
          console.log("______________")
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
    /*
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

        let hvv : any[] = JSON.parse(window.localStorage.getItem("hv")  || '{}');
        if(this.adding >0){
          hvv.forEach((element,index)=>{
            if(element.id === this.adding) hvv.splice(index,1);
          });       
          nuevo.id = this.adding;  
        }
        hvv.push(nuevo);
        window.localStorage.setItem("hv", JSON.stringify(hvv));
        this.router.navigate(["/hojaDeVida"], {skipLocationChange:true})
      
      
      /*let nuevoHV = new ResumeEntity();
      nuevoHV.name = this.listaRespuestas[0].description;
      nuevoHV.answerEntities = this.listaRespuestas;
      nuevoHV.
      nuevoHV.status = 'Espera';*/
      
    //} 

    /*if(this.section >= this.seccionMayor){
      this.registrar = true;
      this.btnText = "Finalizar";
    }*/

    //console.log("sec")
  }  

  registrarPreguntas(){
    
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  anterior(){
    this.btnText = "Siguiente";
    this.section--;
  }
}