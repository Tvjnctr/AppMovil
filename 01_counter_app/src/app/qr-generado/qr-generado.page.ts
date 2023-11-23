import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clase } from '../modelos/usuario';
import { FirebaseService } from '../servicio/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-generado',
  templateUrl: './qr-generado.page.html',
  styleUrls: ['./qr-generado.page.scss'],
})
export class QrGeneradoPage implements OnInit {

  idAsistencia : string = '';

  constructor(private activatedroute: ActivatedRoute, private fire: FirebaseService, private router : Router) { }

  ngOnInit() {
    this.activatedroute.queryParams.subscribe(async params => {
      if (params['idasistencia']) {
        this.idAsistencia = (params['idasistencia'])
      }
    });
  }

}
