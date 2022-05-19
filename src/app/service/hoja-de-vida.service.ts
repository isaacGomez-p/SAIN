import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HojaDeVidaService {

  private idHojaDeVida: number;
  private idUser: number;

  constructor() { }

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
}
