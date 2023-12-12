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


  async obtenerAsistencia2(user: string) {
    const userRef = ref(this.db, `/asistencia/${user}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val() as Asistencia;
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

  async alumnoPresente(idAsistencia: string, idUsuario: string, asignaturainscrita: string[], idClase: string): Promise<void> {
    const attendanceRef = ref(this.db, `asistencia/${idAsistencia}`);
    console.log("SERVICIO " + attendanceRef)
    try {
      const snapshot = await get(attendanceRef);
      if (snapshot.exists()) {
        const usuarioPerteneceALaClase = await this.alumnoPerteneceClase(asignaturainscrita, idClase)
        console.log(usuarioPerteneceALaClase)
        if (!usuarioPerteneceALaClase) {
          console.log('usuario no pertenece a la clase')
          return
        } else {
          const attendance = snapshot.val();
          attendance.alumnopresente = attendance.alumnopresente || [];
          if (!attendance.alumnopresente.includes(idUsuario)) {
            attendance.alumnopresente.push(idUsuario);
            await set(attendanceRef, attendance);
          }
        }
      } else {
        console.log('Attendance record not found');
      }
    } catch (error) {
      console.error('Error updating attendance record:', error);
      throw error;
    }
  }

  async alumnoPerteneceClase(asignaturainscrita: string[], idClase: string) {
    console.log('A1 = '+asignaturainscrita)
    console.log('A2 = '+idClase)
    const alumnoPertenece = asignaturainscrita.includes(idClase)

    return alumnoPertenece ? true : null;
  }


  async obtenerAsistenciasPorClase(idclase: string) {
    const asistenciasRef = ref(this.db, '/asistencia');
    const snapshot = await get(asistenciasRef);
    if (snapshot.exists()) {
      const todasLasAsistencias = snapshot.val();
      const asistenciasFiltradas = Object.keys(todasLasAsistencias)
        .filter(key => todasLasAsistencias[key].idclase == idclase)
        .map(key => {
          return {
            ...todasLasAsistencias[key]
          };
        });
      return asistenciasFiltradas;
    } else {
      return [];
    }
  }


}