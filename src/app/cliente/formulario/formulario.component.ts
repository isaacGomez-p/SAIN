import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  section: number = 1;

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
      section: 1,
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

  constructor() { }

  ngOnInit(): void {
  }

  siguiente(){
    console.log("___ " + this.preguntas[0].answer)
    console.log("___ " + this.preguntas[3].answer)
    this.section++;
  }

  anterior(){
    this.section--;
  }

}
