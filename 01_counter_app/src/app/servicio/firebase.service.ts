import { Injectable } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  
  constructor(private db: Database) {}

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