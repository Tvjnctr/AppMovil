import { Component, OnInit } from '@angular/core';
import { Alumno } from '../modelos/usuario';
import { Storage } from '@ionic/storage-angular';
import { FirebaseService } from '../servicio/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  alumno?: Alumno;
  detallesClases: any[]; 
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
    this.obtenerDetalleClases(this.alumno.asignaturaprofe);
  }

  async obtenerDetalleClases(idsClases: string[]) {
    this.detallesClases = await this.firebaseService.obtenerDetalleClases(idsClases);
    console.log('Detalles de clases:', this.detallesClases);
    // Puedes utilizar detallesClases en tu HTML para mostrar la información necesaria
  }

  verDetalleAsignatura(idclase: string) {
    this.router.navigate(['/detalle-asignatura'], {
      queryParams: { idclase: idclase }
    });
  }
}
