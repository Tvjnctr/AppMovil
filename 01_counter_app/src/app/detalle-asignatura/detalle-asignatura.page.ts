import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clase } from '../modelos/usuario';
import { FirebaseService } from '../servicio/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.page.html',
  styleUrls: ['./detalle-asignatura.page.scss'],
})
export class DetalleAsignaturaPage implements OnInit {

  asignatura : Clase = new Clase()
  codigoAsignatura: string = '';
  asistenciasClase : any[] = [];
  constructor(private activatedroute: ActivatedRoute, private fire: FirebaseService, private router : Router) { }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe(async params => {
      if (params['idclase']) {
        this.codigoAsignatura = params['idclase'];
        const asignaturaObtenida = await this.fire.obtenerClase(this.codigoAsignatura);
        if (asignaturaObtenida) {
          this.asignatura = asignaturaObtenida;
          this.listaAsistencia()
        } else {
          // Manejar el caso de que la asignatura no se encuentre
          console.log('Asignatura no encontrada');
        }
      }

    });
  }

  async crearAsistencia(){
    const uuid = await this.fire.crearAsistencia(this.asignatura)
    this.verDetalleAsignatura(uuid)

  }

  verDetalleAsignatura(idasistencia: string) {
    this.router.navigate(['/qr-generado'], {
      queryParams: { idasistencia: idasistencia }
    });
  }

  listaAsistencia(){
    this.fire.obtenerAsistenciasPorClase(this.asignatura.idclase).then(asistencias => {
      console.log("FLAG1",asistencias)
      this.asistenciasClase= asistencias; // Aquí tendrás las asistencias filtradas por idClase = 1
    });
  }

  
  verAsistenciasPasadas(uuid: string){
    this.router.navigate(['/qr-generado'], {
      queryParams: { idasistencia: uuid }
    });
  }

}
