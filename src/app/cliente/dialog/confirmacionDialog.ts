import { Component, Inject } from "@angular/core";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "src/app/model/dialogData";

@Component({
    selector: 'dialog-confirmacion',
    templateUrl: 'confirmacionDialog.html',
  })
  export class ConfirmacionDialog {
  
  constructor(public dialogRef: MatDialogRef<ConfirmacionDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData){
  
    }
  
  numeroIdentificacionRegistro: number;
  nombre: string;
  
  confirmacion(){       
    this.cerrarDialog("SI");        
  }
  
  cerrarDialog(mensaje: string){
    this.dialogRef.close(mensaje);
  }
  
  }