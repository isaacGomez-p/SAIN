import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseService } from 'src/app/model/responseService';
import { environment } from 'src/environments/environment';
import { RequestEntity } from 'src/app/model/requestEntity';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private _controller =  environment.URL + "report/";
  private _generate = this._controller + "generate";  
  private _generateNoTable = this._controller + "generateNoTable";
  private _generateExcel = this._controller + "generateExcel";

  constructor(private http: HttpClient) { }
  
  public generate(resume: number) : Observable<ResponseService> {      
    let RequestEntity = {
      id: resume
    }
    return this.http.post<ResponseService>(this._generate, RequestEntity);
  }
  
  public generateNoTable(resume: number) : Observable<ResponseService> {      
    let RequestEntity = {
      id: resume
    }
    return this.http.post<ResponseService>(this._generateNoTable, RequestEntity);
  }

  public generateExcel(requestEntity: RequestEntity) : Observable<ResponseService> {
    return this.http.post<ResponseService>(this._generateExcel, requestEntity);
  }

}
