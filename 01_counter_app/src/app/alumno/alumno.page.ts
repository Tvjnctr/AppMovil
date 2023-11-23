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

  alumno?: Alumno;
  detallesClases: any[]; // Asegúrate de tener una propiedad para almacenar los detalles de las clases

  constructor(private storage: Storage, private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    const usuario = await this.storage.get('currentUser');
    if (usuario) {
      this.alumno = usuario;
      console.log(usuario);

      // Llamar al método para obtener detalles de las clases
  
    } else {
      console.log('No se encontraron datos del usuario');
      // Manejar la situación cuando no hay datos del usuario
    }
    this.obtenerDetalleClases(this.alumno.asignaturainscrita);
  }

  async obtenerDetalleClases(idsClases: string[]) {
    this.detallesClases = await this.firebaseService.obtenerDetalleClases(idsClases);
    console.log('Detalles de clases:', this.detallesClases);
    // Puedes utilizar detallesClases en tu HTML para mostrar la información necesaria
  }
}
