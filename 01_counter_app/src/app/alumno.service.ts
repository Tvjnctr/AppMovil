import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private baseUrl = 'http://localhost:3000/Alumnos';

  constructor(private http: HttpClient) { }

  getAlumnos() {
    return this.http.get(this.baseUrl);
  }


}
