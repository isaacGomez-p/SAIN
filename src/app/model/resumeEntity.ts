import { AnswerEntity } from "./answerEntity";
import { UserEntity } from "./userEntity";

export class ResumeEntity {

    resumeId: number; //Id

    numberId: string; //Identificador
    name: string; //Nombre Postulante  

    //Variables para el rol Proveedor
    verified: boolean; //Verificado
    verificationDate: Date; //Fecha de Verificación
    userBy: UserEntity; //Verificado Por
    recommendation: string; //Recomendacion
    observation: string; //Observación

    //Variables para el rol Cliente
    process: string; //Proceso
    score: number; //Puntuación
    status: string; //Estado: W -> ESPERA R -> REVISION  C -> CHECKED F->FINISHED
    //recommendation: string; //Recomendacion

    userCreate: UserEntity; //Usuario quién creo la hoja de vida
    userAssign: UserEntity; //Usuario a quién fue asignado
    answerEntities: AnswerEntity[]; //Respuesta a esa hoja de vida        
    creationDate : Date;            
}