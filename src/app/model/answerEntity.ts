import { QuestionsEntity } from "./questionsEntity";
import { ResumeEntity } from "./resumeEntity";
import { UserEntity } from "./userEntity";

export class AnswerEntity{

    answerId: number | null;
    description: string; //Respuesta
    verified: boolean;
    creationDate: Date;
    userMod: UserEntity;
    resumes: ResumeEntity;
    questions: QuestionsEntity;
    verifiedDate: Date;
    result: boolean;
}