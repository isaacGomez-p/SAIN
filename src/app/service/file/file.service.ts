
import { Injectable } from '@angular/core';
import { FileEntity } from 'src/app/model/fileEntity';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private fileArray: FileEntity[];

  constructor() { }
    
  public guardarArregloDeArchivos(fileArray: FileEntity[]){
    this.fileArray = fileArray;
  }

  public obtenerArregloDeArchivos() : FileEntity[]{
    return this.fileArray;
  }
  

}
