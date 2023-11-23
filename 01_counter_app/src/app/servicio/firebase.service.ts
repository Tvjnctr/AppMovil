import { Injectable } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import { Storage } from '@ionic/storage-angular';
import { Alumno } from '../modelos/usuario';

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

  async obtenerClasesDeAlumno(userId: string) {
    const userRef = ref(this.db, `/alumnos/${userId}/asignaturainscrita`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
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





}