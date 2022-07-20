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
  private _getCount = this._controller + "getCount"

  constructor(private http: HttpClient) { }
  
  public findAll(seccion: number, rol: number | undefined, profile:string|undefined) : Observable<ResponseService> {      
    let RequestEntity = {
      id: seccion,
      data: rol+"",
      data1: profile
    }
    return this.http.post<ResponseService>(this._findAll, RequestEntity);
  }

  public findCount() : Observable<ResponseService> {
    return this.http.post<ResponseService>(this._getCount, null);
  }

}
