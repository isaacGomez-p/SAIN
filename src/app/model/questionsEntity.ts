import { AnswerEntity } from "./answerEntity";

export class QuestionsEntity{
    questionId: number;
    description: string;    
    priority: number;
    height: number;
    section: number;
    type: string;
    answerEntities: AnswerEntity[];    
    status: String;

    //No mapeado
    answer: string;
    answerObjeto: AnswerEntity
}