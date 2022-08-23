import { AnswerEntity } from "./answerEntity";
import { UserEntity } from "./userEntity";

export class ResumeEntity {

    resumeId: number; //Id

    numberId: string; //Identificador
    name: string; //Nombre Postulante  

    //Variables para el rol Proveedor
    verified: number; //Verificado boolean?
    verificationDate: Date; //Fecha de Verificación
    assignDate: Date; //Fecha de asignacion
    userBy : UserEntity | null; //Verificado Por
    recommendation: string; //Recomendacion    

    //Variables para el rol Cliente
    process: string; //Proceso
    score: number; //Puntuación
    status: string; //Estado: W -> ESPERA R -> REVISION  C -> CHECKED F->FINISHED
    //recommendation: string; //Recomendacion

    userCreate: UserEntity; //Usuario quién creo la hoja de vida
    userAssign: UserEntity | null; //Usuario a quién fue asignado
    answerEntities: AnswerEntity[]; //Respuesta a esa hoja de vida        
    creationDate : Date;            

    costCenter: string; //centro de costo
    bussUnit: string; //unidad de negocio
    profile: string; //perfil

    adminObservation: string;
    provObservation: string;
}