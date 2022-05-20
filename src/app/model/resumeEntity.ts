import { AnswerEntity } from "./answerEntity";

export class ResumeEntity {
    resumeId: number;
    name: string;
    status: string;
    priority: number;
    creationDate : Date;
    user: number;
    answerEntities: AnswerEntity[];

}