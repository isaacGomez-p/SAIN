import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParametersEntity } from 'src/app/model/parametersEntity';
import { ResponseService } from 'src/app/model/responseService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private _controller =  environment.URL + "parametros/";
  private _findAll = this._controller + "findAll";    

  listaParametros: ParametersEntity[];

  constructor(private http: HttpClient) { }
  
  private findAll() : Observable<ResponseService> {        
    return this.http.get<ResponseService>(this._findAll);
  }
  
  public cargarParametros(){
    this.findAll().subscribe((data)=>{
      if(data.status === 200){
        this.listaParametros = data.result;
      }      
    })
  }

}
