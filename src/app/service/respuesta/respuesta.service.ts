import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerEntity } from 'src/app/model/answerEntity';
import { ResponseService } from 'src/app/model/responseService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private _controller =  environment.URL + "answer/";
  private _save = this._controller + "save";
  private _get = this._controller + "save";

  constructor(private http: HttpClient) { }

  public save(user: AnswerEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._save, user);
  }

  public get(id: number) : Observable<ResponseService> {  
    let hojaDeVida = {
      id: id
    }
    return this.http.post<ResponseService>(this._save, hojaDeVida);
  }


}
