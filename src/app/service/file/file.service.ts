import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileEntity } from 'src/app/model/fileEntity';
import { environment } from 'src/environments/environment';
import { ResponseService } from 'src/app/model/responseService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private fileArray: FileEntity[];

  private _controller =  environment.URL + "file/";
  private _save = this._controller + "save";
  private _findByModuleId = this._controller + "findByModuleId";

  constructor(private http: HttpClient) { }

  uploadFile(fileEntity : FileEntity): Observable<ResponseService> {
    // Note that setting a content-type header
    // for mutlipart forms breaks some built in
    // request parsers like multer in express.
    //const options = {} as any; // Set any options you like
    //const formData = new FormData();
  
    // Append files to the virtual form.    
      //formData.append("file", fileEntity.file)
    
  
    // Optional, append other kev:val rest data to the form.
    
      //formData.append("data", JSON.stringify(fileEntity));
      //formData.append(
      //  'data',
      //  new Blob([JSON.stringify(fileEntity)], {type: 'application/json'}))
    
  
    // Send it.
    return this.http.post<ResponseService>(this._save, fileEntity);
  }

  getFilesByModuleId(): Observable<ResponseService> {
    let requestEntity = {
      id: 20
    }
    // Note that setting a content-type header
    // for mutlipart forms breaks some built in
    // request parsers like multer in express.
    //const options = {} as any; // Set any options you like
    //const formData = new FormData();
  
    // Append files to the virtual form.    
      //formData.append("file", fileEntity.file)
    
  
    // Optional, append other kev:val rest data to the form.
    
      //formData.append("data", JSON.stringify(fileEntity));
      //formData.append(
      //  'data',
      //  new Blob([JSON.stringify(fileEntity)], {type: 'application/json'}))
    
  
    // Send it.
    return this.http.post<ResponseService>(this._findByModuleId, requestEntity);
  }
    
  public guardarArregloDeArchivos(fileArray: FileEntity[]){
    this.fileArray = fileArray;
  }

  public obtenerArregloDeArchivos() : FileEntity[]{
    return this.fileArray;
  }
  

}
