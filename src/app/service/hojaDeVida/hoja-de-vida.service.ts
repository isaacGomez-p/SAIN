import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestEntity } from 'src/app/model/requestEntity';
import { ResponseService } from 'src/app/model/responseService';
import { ResumeEntity } from 'src/app/model/resumeEntity';
import { UserEntity } from 'src/app/model/userEntity';
import { environment } from 'src/environments/environment';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class HojaDeVidaService {

  private _controller = environment.URL + "resume/";
  private _save = this._controller + "save";
  private _update = this._controller + "update";
  private _findByUserAssign = this._controller + "findByUserAssign";
  private _findByUserCreate = this._controller + "findByUserCreate";
  private _findAll = this._controller + "findAll";
  private _recCount = this._controller + "recCount";
  private _delete = this._controller + "delete";

  private idHojaDeVida: number;
  private idUser: number;
  private user : UserEntity | null;
  private resume: ResumeEntity | null;
  private editar: boolean;
  private userLogin: UserEntity | null;

  constructor(private http: HttpClient,
    private generalService: GeneralService) { }

  public cerrarSesion(){
    this.idHojaDeVida = 0;
    this.idUser = 0;
    this.user = null;
    this.resume = null;
    this.userLogin = null;
    this.generalService.navegar("login");
  }

  public save(user: ResumeEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._save, user);
  }

  public update(user: ResumeEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._update, user);
  }

  public findAll(user: UserEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._findAll, user);
  }

  public findByUserAssign(user: UserEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._findByUserAssign, user);
  }

  public findByUserCreate(user: UserEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._findByUserCreate, user);
  }

  public delete(request: RequestEntity) : Observable<ResponseService> {  
    return this.http.post<ResponseService>(this._delete, request);
  }

  public recCount(user: number | null, tipo: string) : Observable<ResponseService> {  
    let requestEntity = {
      id: user,
      data: tipo
    }
    return this.http.post<ResponseService>(this._recCount, requestEntity);
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

  public obtenerUser() : UserEntity | null{
    return this.user;
  }

  public guardarUserLogin(userLogin : UserEntity){
    this.userLogin = userLogin;
  }

  public obtenerUserLogin() : UserEntity | null{
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
