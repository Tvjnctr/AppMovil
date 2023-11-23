import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ChangeDetectorRef } from '@angular/core'; 
import { Alumno } from '../modelos/usuario';
import { Storage } from '@ionic/storage-angular';
import { FirebaseService } from '../servicio/firebase.service';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrscannerPage implements OnInit {
  
  alumno?: Alumno;
  asistencia:string = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private storage: Storage, 
    private firebaseService: FirebaseService
    ) { }

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
  }

  async startScan() {
    document.body.classList.add('barcode-scanner-active');
    const listener = await BarcodeScanner.addListener('barcodeScanned', async (result) => {
      if (result.barcode.displayValue) {
        this.asistencia = result.barcode.displayValue; 
        this.firebaseService.alumnoPresente(this.asistencia, this.alumno.rut)
        this.stopScan(); 
      }
    });
    await BarcodeScanner.startScan();
  }

  async stopScan() {
    document.body.classList.remove('barcode-scanner-active');
    await BarcodeScanner.removeAllListeners();
    await BarcodeScanner.stopScan();
    this.changeDetectorRef.detectChanges();
  }

}
