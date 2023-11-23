import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../servicio/firebase.service';
import { Alumno } from '../modelos/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  inputRut: string = '';
  userInfo: Alumno = new Alumno();
  isInputValid: boolean = true;
  contrasenaInput: string = '';

  constructor(private fire: FirebaseService, private router: Router) {}

  async obtenerInfo() {
    this.userInfo = await this.fire.obtenerUsuario(this.inputRut)
  }

  onRutInputChange() {
    this.isInputValid = /^[0-9Kk\-]+$/.test(this.inputRut);
  }

  async validateRut() {
    await this.obtenerInfo(); // Espera a que se complete la obtención de información del usuario
    console.log(this.userInfo)
    if (this.userInfo && this.userInfo.contra === this.contrasenaInput) {
      console.log('Credenciales válidas');
      await this.fire.setCurrentUser(this.userInfo);
      this.router.navigate(['/alumno']);
    } else {
      console.log('Credenciales inválidas');
      // Puedes mostrar un mensaje de error al usuario en la interfaz de usuario si lo deseas
    }
  }

  isValidRut(rut: string): boolean {
    const rutPattern = /^\d{7,8}-?(\d|k|K)$/;
    if (!rutPattern.test(rut)) {
        return false;
    }

    const [rutNumber, rutDv] = rut.split('-');
    if (rutDv) {
        return this.calculateDv(rutNumber) === rutDv.toUpperCase();
    } else {
        return false; // Manejar el caso donde rutDv es undefined
    }
}
  
  calculateDv(rutNumber: string): string {
    // Elimina cualquier posible punto o guión en el RUT
    rutNumber = rutNumber.replace(/\./g, '').replace(/-/g, '');
  
    // Convierte el RUT a un número entero
    let rut = parseInt(rutNumber, 10); // Cambiamos 'const' a 'let'
  
    // Calcula el dígito verificador
    let suma = 0;
    let multiplicador = 2;
  
    while (rut > 0) {
      const digito = rut % 10;
      suma += digito * multiplicador;
  
      rut = Math.floor(rut / 10);
  
      multiplicador++;
      if (multiplicador > 7) {
        multiplicador = 2;
      }
    }
  
    const dvCalculado = 11 - (suma % 11);
  
    // En caso de que el DV sea 11, lo reemplazamos por '0'
    if (dvCalculado === 11) {
      return '0';
    }
    // En caso de que el DV sea 10, lo reemplazamos por 'K'
    if (dvCalculado === 10) {
      return 'K';
    }
  
    return dvCalculado.toString();
  }
}