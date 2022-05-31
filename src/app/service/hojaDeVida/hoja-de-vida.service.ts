import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseService } from 'src/app/model/responseService';
import { ResumeEntity } from 'src/app/model/resumeEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HojaDeVidaService {

  private _controller = environment.URL + "resume/";
  private _save = this._controller + "save";
  private _findByUser = this._controller + "findByUser";
  private _recCount = this._controller + "recCount";

  private idHojaDeVida: number;
  private idUser: number;
  private user : UserEntity;
  private resume: ResumeEntity | null;
  private editar: boolean;
  private userLogin: UserEntity;

  constructor(private http: HttpClient) { }

  public save(user: ResumeEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._save, user);
  }

  public findByUser(user: UserEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._findByUser, user);
  }

  public recCount() : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._recCount, null);
  }

  public guardarIdHojaDevida(id: number){
    this.idHojaDeVida = id;
  }

  public obtenerIdHojaDeVida() : number{
    return this.idHojaDeVida;
  }

  public guardarIdUser(id: number){
    this.idUser = id;
  }

  public obtenerIdUser() : number{
    return this.idUser;
  }

  public obtenerUser() : UserEntity{
    return this.user;
  }

  public guardarUserLogin(userLogin : UserEntity){
    this.userLogin = userLogin;
  }

  public obtenerUserLogin() : UserEntity{
    return this.userLogin;
  }

  public guardarUser(user: UserEntity){
    this.user = user;
  }

  public obtenerResume() : ResumeEntity | null{
    return this.resume;
  }

  public guardarResume(resume: ResumeEntity | null){    
    this.resume = resume;
  }

  public estaEditando(): boolean {
    return this.editar;
  }

  public guardarEstaEditando(estado : boolean){
    this.editar = estado;
  }

}
