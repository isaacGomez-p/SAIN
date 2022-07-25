import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileEntity } from 'src/app/model/fileEntity';
import { FileService } from 'src/app/service/file/file.service';
import { GeneralService } from 'src/app/service/general/general.service';
import { HojaDeVidaService } from 'src/app/service/hojaDeVida/hoja-de-vida.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  //SUBIDA DE ARCHIVOS
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  ImageBaseData:string | ArrayBuffer | null;
  fileArray: FileEntity[];    
  splitted: string[] | undefined;

  private maxFiles: number = 5;

  @Output() guardarArchivos = new EventEmitter();
  @Output() eliminarTodosArchivos = new EventEmitter();

  constructor(private fileService: FileService,
    private generalService: GeneralService,
    private hojaDeVidaService: HojaDeVidaService) { }

  ngOnInit(): void {
  } 

  clearFile(){
    this.eliminarTodosArchivos.emit();
  }

  subirArchivos(fileInput: any) {      
    this.guardarArchivos.emit(fileInput);
  }

  limpiarFileService(){
    this.fileArray = [];
    this.fileService.guardarArregloDeArchivos(this.fileArray);
  }

 

  fileChangeEvent(fileInput: any) {      
    
    console.log(fileInput);
    for(let i = 0; i < this.maxFiles; i++){          
      
      if (fileInput.files && fileInput.files[i]) {
          // Size Filter Bytes
          const max_size = 20971520;
          const allowed_types = ["application/pdf"];
          //'application/msword '
          //'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

          if (fileInput.files[i].size > max_size) {
              this.imageError =
                  'Maximum size allowed is ' + max_size / 1000 + 'Mb';
          }else{   
            const reader = new FileReader();
            reader.readAsDataURL(fileInput.files[i]);
            reader.onload = (e: any) => {              
            this.ImageBaseData=reader.result;
            this.splitted = this.ImageBaseData?.toString().split(",", 2); 
            this.isImageSaved = true;                
            this.generalService.mostrarMensaje("success", "Archivo " + fileInput.files[i].name + " cargado correctamente.");                
            this.saveFile(fileInput.files[i].name);
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }
      }
    }    
  }

  saveFile(nombreArchivo: string){
    if(this.splitted){
      var fileEntity = new FileEntity();
      if(this.fileService.obtenerArregloDeArchivos()){
        this.fileArray = this.fileService.obtenerArregloDeArchivos();
      }else{
        this.fileArray = [];
      }                 
      fileEntity.filee = this.splitted?.[1];
      fileEntity.module = this.hojaDeVidaService.obtenerUserLogin()?.roleEntity.name;
      fileEntity.type = nombreArchivo;
      fileEntity.extension = "PDF";
                  
      var validacion: number = 1;
              
      this.fileArray.map((item)=>{
        if(item.type === nombreArchivo){
          validacion = 0;
        }
      })

      console.log(validacion);        

      if(validacion !== 0){
        this.fileArray.push(fileEntity);
        console.log("entro");
        this.fileService.guardarArregloDeArchivos(this.fileArray);
      }  
    }      
  }

}
