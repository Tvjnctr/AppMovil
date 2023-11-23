import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../servicio/firebase.service';
import { Alumno } from '../modelos/usuario';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  alumno: Alumno; // Asegúrate de tener una propiedad para almacenar los datos del alumno

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
    // Reemplaza 'id_del_alumno' con la lógica adecuada para obtener el ID del alumno actual
    const userId = 'id_del_alumno'; 
    this.firebaseService.obtenerUsuario(userId).then(alumno => {
      this.alumno = alumno;
      this.obtenerClasesDeAlumno(userId);
    });
  }

  obtenerClasesDeAlumno(userId: string) {
    this.firebaseService.obtenerClasesDeAlumno(userId).then(clases => {
      console.log('Clases del alumno:', clases);
      // Puedes asignar las clases a propiedades del componente si es necesario
    });
  }

  // ... otros métodos, como logoutAndNavigateToHome()
}