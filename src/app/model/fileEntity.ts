export class FileEntity {

    fileId: number; //Id
    dtCreate: Date; //Fecha creacion
    dtModify: Date; //Fecha edicion
    extension: string; //Extension edl archivo    
    fileName: string; //Nombre del archivo
    location: string; //ubicacion del archivo
    module: string | undefined; //Modulo que lo inserto. ADMIN, PROVEEDOR, CLIENTE
    moduleId: number; //Id del resume al que pertenece
    type: string; //tipo de archivo, si es hoja de vida, cedula, etc
    file: string | undefined; //Arreglo de bytes en base 64 del archivo
}