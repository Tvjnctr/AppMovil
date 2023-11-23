import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {}

  getUserByRut(rut: string): Observable<any> {
    return this.db.object(`Alumnos/${rut}`).valueChanges();
  }
}