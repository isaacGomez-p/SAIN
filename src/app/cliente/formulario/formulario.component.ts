import { Component, OnInit } from '@angular/core';
import { AnswerEntity } from 'src/app/model/answerEntity';
import { QuestionsEntity } from 'src/app/model/questionsEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { HojaDeVidaService } from 'src/app/service/hoja-de-vida.service';
import { RespuestaService } from 'src/app/service/respuesta/respuesta.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  section: number = 1;
  cargando: boolean = false;

  preguntas = [
    {
      id: 1,     
      descripcion: "Como se llama",   
      height: 1,
      section: 1,
      answer: null,
      tipo: 'text'
    },
    {
      id: 2,     
      descripcion: "Edad",      
      height: 1,
      section: 1,
      answer: null,
      tipo: 'number'
    },
    {
      id: 3,     
      descripcion: "Antecedentes",      
      height: 5,
      section: 2,
      answer: null,
      tipo: 'text'
    },
    {
      id: 4,     
      descripcion: "Aspiración salarial",      
      height: 1,
      section: 1,
      answer: null,
      tipo: 'moneda'
    },
    {
      id: 5,     
      descripcion: "Enfermedades",      
      height: 2,
      section: 2,
      answer: null,
      tipo: 'text'
    },
  ]

  constructor(private respuestaService: RespuestaService,
    private hojaDeVidaService: HojaDeVidaService
    ) { }

  ngOnInit(): void {
    this.cargarDatosHojaDeVida();
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
    this.cargando = true;

    this.preguntas.map((item)=>{      
      if(item.answer !== null && this.section == item.section){
        let respuesta = new AnswerEntity();
        respuesta.description = item.answer;
        let question = new QuestionsEntity();
        question.questionId = item.id;
        respuesta.questions = question;
        respuesta.hojaDeVida = this.hojaDeVidaService.obtenerIdHojaDeVida();
        let user = new UserEntity();
        user.userId = this.hojaDeVidaService.obtenerIdUser();
        respuesta.user = user;
        respuesta.verified = false;
        console.log(respuesta)
        this.respuestaService.save(respuesta).subscribe((data)=>{
          console.log(data)
          if(data.status === 201){
            
          }else{

          }
        })
      }
    })

    this.section++;
    this.cargando = false;        

  }

  anterior(){
    this.section--;
  }

}
