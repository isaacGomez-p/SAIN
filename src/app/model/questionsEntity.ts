import { AnswerEntity } from "./answerEntity";
import { RolEntity } from "./rolEntity";

export class QuestionsEntity{
    questionId: number;
    description: string;    
    priority: number;
    height: number;
    section: number;
    type: string;
    answerEntities: AnswerEntity[];    
    status: String;
    roles: RolEntity[];
    //No mapeado
    answer: string;
    answerObjeto: AnswerEntity
}