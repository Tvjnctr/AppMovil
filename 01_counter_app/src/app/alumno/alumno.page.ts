import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../servicio/firebase.service';
import { Alumno } from '../modelos/usuario';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  alumno: Alumno; // Asegúrate de tener una propiedad para almacenar los datos del alumno

  constructor( private storage: Storage, private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {

    this.cargarDatosUsuario()
  }

  async cargarDatosUsuario() {
    const usuario = await this.storage.get('currentUser');
    if (usuario) {
      this.alumno = usuario;
      console.log(usuario);
    } else {
      console.log('No se encontraron datos del usuario');
      // Manejar la situación cuando no hay datos del usuario
    }
  }
}