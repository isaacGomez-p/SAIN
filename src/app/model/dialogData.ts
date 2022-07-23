import { AnswerEntity } from "./answerEntity";
import { ResumeEntity } from "./resumeEntity";

export class DialogData {
    hojaDeVida: ResumeEntity;
    mensaje: string;
    answer: AnswerEntity;
}