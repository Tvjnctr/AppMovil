import { Injectable } from '@angular/core';
import { Database, ref, get, set } from '@angular/fire/database';
import { Storage } from '@ionic/storage-angular';
import { Alumno, Clase, Asistencia } from '../modelos/usuario';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private currentUser: Alumno = new Alumno();
  constructor(private db: Database, private storage: Storage) {
    this.storage.create();
  }

  async setCurrentUser(alumno: Alumno) {
    this.currentUser = alumno;
    await this.storage.set('currentUser', alumno);
  }

  async getCurrentUser() {
    if (this.currentUser) {
      return this.currentUser;
    }
    this.currentUser = await this.storage.get('currentUser');
    return this.currentUser;
  }

  async clearCurrentUser() {
    this.currentUser = new Alumno();
    this.storage.remove('currentUser');
  }

  async obtenerUsuario(user: string) {
    const userRef = ref(this.db, `/alumnos/${user}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {    
      return snapshot.val();
    } else {
      return null;
    }
  }

  
  async obtenerClase(user: string) {
    const userRef = ref(this.db, `/clases/${user}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {    
      return snapshot.val();
    } else {
      return null;
    }
  }

  async obtenerDetalleClases(idsClases: string[]) {
    const detallesClases = [];
    
    for (const idClase of idsClases) {
      const claseRef = ref(this.db, `/clases/${idClase}`);
      const snapshot = await get(claseRef);

      if (snapshot.exists()) {
        detallesClases.push(snapshot.val());
      }
    }

    return detallesClases;
  }

  
  async obtenerAsistencia(user: string) {
    const userRef = ref(this.db, `/asistencia/${user}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {    
      return snapshot.val();
    } else {
      return null;
    }
  }


  async crearAsistencia(clase: Clase): Promise<string> {
    const uuid = this.generateUuid();

    // Crear un nuevo objeto Asistencia usando la clase modelo
    const nuevaAsistencia = new Asistencia();
    nuevaAsistencia.fecha = this.getCurrentTimestamp();
    nuevaAsistencia.nombreclase = clase.nombre;
    nuevaAsistencia.idclase = clase.idclase;
    nuevaAsistencia.idasistencia = uuid;

    // Guardar el objeto Asistencia en Firebase
    const asistenciaRef = ref(this.db, `/asistencia/${uuid}`);
    await set(asistenciaRef, nuevaAsistencia);

    return uuid; // Devuelve el UUID del nuevo registro de asistencia
  }

  generateUuid(): string {
    return uuidv4();
  }

  getCurrentTimestamp(): number {
    return new Date().getTime();
  }

}