import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asistencia, Clase } from '../modelos/usuario';
import { FirebaseService } from '../servicio/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-generado',
  templateUrl: './qr-generado.page.html',
  styleUrls: ['./qr-generado.page.scss'],
})
export class QrGeneradoPage implements OnInit {

  nombresAlumnos: string[] = [];
  idAsistencia : string = '';
  infoasistencia : Asistencia = new Asistencia();

  constructor(private activatedroute: ActivatedRoute, private fire: FirebaseService, private router : Router) { }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe(async params => {
      if (params['idasistencia']) {
        this.idAsistencia = (params['idasistencia']);
        this.infoasistencia = await this.fire.obtenerAsistencia2(this.idAsistencia)
        console.log("flag0",this.infoasistencia)
        await this.obtenerNombresAlumnos();
      }
    });
  }


  async obtenerNombresAlumnos() {
    console.log("existen0")
    if (this.infoasistencia && this.infoasistencia.alumnopresente) {
      console.log("existen")
      console.log(this.infoasistencia.alumnopresente)
      for (const idAlumno of this.infoasistencia.alumnopresente) {
        const infoAlumno = await this.fire.obtenerUsuario(idAlumno);
        console.log(infoAlumno)
        if (infoAlumno) {
          this.nombresAlumnos.push(infoAlumno.nombre);
          console.log("final",this.nombresAlumnos) // Asumiendo que 'nombre' es una propiedad de la info del alumno
        }
      }
    }
  }
}
