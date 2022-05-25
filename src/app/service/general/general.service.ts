import { Injectable } from '@angular/core';
import { ResponseService } from '../../model/responseService';
import { UserEntity } from '../../model/userEntity';
import{ HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment'
import { Router } from '@angular/router';
import { RequestEntity } from 'src/app/model/requestEntity';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private _controller =  environment.URL + "user/";
  private _save = this._controller + "save";
  private _login = this._controller + "login";
  private _findByRole = this._controller + "findByRole";

  constructor(private http: HttpClient,
    private router: Router,
    private messageService: MessageService) { }

  public login(user: UserEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._login, user);
  }

  public save(user: UserEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._save, user);
  }

  public navegar(url: string){
    url = "/"+url;
    this.router.navigate([url], {skipLocationChange:true})
  }

  public findByRole(data: RequestEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._findByRole, data);
  }

  public mostrarMensaje(tipo: string, mensaje: string){
    this.messageService.add({severity:tipo, summary:mensaje});
  }

}
