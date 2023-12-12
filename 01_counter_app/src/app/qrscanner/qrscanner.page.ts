import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ChangeDetectorRef } from '@angular/core'; 
import { Alumno, Clase } from '../modelos/usuario'; // Importa la clase Clase
import { Storage } from '@ionic/storage-angular';
import { FirebaseService } from '../servicio/firebase.service';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrscannerPage implements OnInit {
  
  
  alumno?: Alumno | undefined;
  asistencia: string = '';
  clases: Clase[] = []; // Agrega la lista de clases

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private storage: Storage, 
    private firebaseService: FirebaseService
  ) { this.alumno = undefined; }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    const usuario = await this.storage.get('currentUser');
    if (usuario) {
      this.alumno = usuario;
      console.log(usuario);

      // Obtener detalles de las clases
      this.clases = await this.firebaseService.obtenerClase(usuario.rut); // Asume que tienes un método para obtener las clases
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
        // Verificar si el alumno está vinculado a la clase escaneada
        const claseVinculada = this.clases.find(clase => clase.idclase === this.asistencia);
        if (claseVinculada && claseVinculada.alumnosinscritos.includes(this.alumno.rut)) {
          // El alumno está vinculado a la clase, puedes registrar su asistencia
          this.firebaseService.alumnoPresente(this.asistencia, this.alumno?.rut);
        } else {
          console.log('El alumno no está vinculado a esta clase.');
        }
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

