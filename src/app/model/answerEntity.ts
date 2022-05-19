import { QuestionsEntity } from "./questionsEntity";
import { UserEntity } from "./userEntity";

export class AnswerEntity{

    answerId: number;
    description: string; //Respuesta
    verified: boolean;
    creationDate: Date;
    user: UserEntity;
    hojaDeVida: number;
    questions: QuestionsEntity;
}