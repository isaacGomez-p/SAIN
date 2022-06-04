import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionsEntity } from 'src/app/model/questionsEntity';
import { ResponseService } from 'src/app/model/responseService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private _controller =  environment.URL + "question/";
  private _findAll = this._controller + "findAll";  

  constructor(private http: HttpClient) { }
  
  public findAll(seccion: number, rol: number | undefined) : Observable<ResponseService> {      
    let RequestEntity = {
      id: seccion,
      data: rol+""
    }
    let question = new QuestionsEntity();
    return this.http.post<ResponseService>(this._findAll, RequestEntity);
  }

}
