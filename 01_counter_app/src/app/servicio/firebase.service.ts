import { Injectable } from '@angular/core';
import { Database, ref, get, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: Database) { }

  async getUserByRut(rut: string){
    const userRef = ref(this.db,`Alumnos/${rut}`)
    const userInfo = await get(userRef)

    return userInfo.val()

  }

}
