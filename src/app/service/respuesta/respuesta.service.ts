import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerEntity } from 'src/app/model/answerEntity';
import { ResponseService } from 'src/app/model/responseService';
import { ResumeAnswerDTO } from 'src/app/model/resumeAnswerDTO';
import { ResumeEntity } from 'src/app/model/resumeEntity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private _controller =  environment.URL + "answer/";
  private _save = this._controller + "save";
  private _findByUser = this._controller + "findByUser";
  private _findByResume = this._controller + "findByResume";
  private _update = this._controller + "update";
  
  constructor(private http: HttpClient) { }

  public save(user: AnswerEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._save, user);
  }

  public get(id: number) : Observable<ResponseService> {  
    let hojaDeVida = {
      userId: id
    }
    return this.http.post<ResponseService>(this._findByUser, hojaDeVida);
  }

  public findByResume(resumen: ResumeEntity  | null) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._findByResume, resumen);
  }

  public update(resumeAnswerDTO: ResumeAnswerDTO) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._update, resumeAnswerDTO);
  }

}
