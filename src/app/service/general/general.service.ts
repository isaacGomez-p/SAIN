import { Injectable } from '@angular/core';
import { ResponseService } from '../../model/responseService';
import { UserEntity } from '../../model/userEntity';
import{ HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private _controller =  environment.URL + "user/";
  private _save = this._controller + "save";
  private _login = this._controller + "login";

  constructor(private http: HttpClient,
    private router: Router) { }

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

}
