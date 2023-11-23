export class Alumno {
    
    "nombre": string = '';
    "apellido": string = '';
    "rut": string = '';
    "sede": string = '';
    "contra": string = '';
    "edad": string = '';
    "esprofe": boolean ;
    "asignaturainscrita": [] = []
    "asignaturaprofe": [] = []
}

export class Clase {
    
    "nombre": string = '';
    "idclase": string = '';
    "alumnosinscritos": [] = []

}

export class Asistencia {
    "idasistencia": string = '';
    "fecha": number = 0 ;
    "nombreclase": string = '';
    "idclase": string = '';
    "alumnopresente": [] = []
}




