import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlumnoService } from 'src/app/alumno.service';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  rutInput: string;
  isInputValid: boolean = true;
  alumnos: any[];
  contrasenaInput: string;
  apiUrl = 'http://localhost:3000/Alumnos';



  constructor(private http: HttpClient, private router: Router) {}




  onRutInputChange() {
    // Verifica si el valor del campo de entrada contiene solo números
    this.isInputValid = /^[0-9Kk\-]+$/.test(this.rutInput);
  }




  validateRut() {
    // Imprime un mensaje en la consola para verificar que la función se está ejecutando
    console.log('Validando credenciales...');
  
    // Llama al método para recuperar los alumnos desde el servidor
    this.getAlumnos();
  
    // Realiza una solicitud HTTP para obtener los datos de los alumnos desde 'apiUrl'
    this.http.get(this.apiUrl).subscribe((alumnos: any[]) => {
      // Busca un usuario con el RUT ingresado en el formulario
      const usuario = alumnos.find((alumno) => alumno.Rut === this.rutInput);
  
      if (usuario && usuario.Contraseña === this.contrasenaInput) {
        // Credenciales válidas, imprime un mensaje en la consola
        console.log('Credenciales válidas');
  
        // Redirige al usuario a la página principal (reemplaza 'pagina-principal' con la ruta real)
        this.router.navigate(['/alumno']);
      } else {
        // Credenciales inválidas, imprime un mensaje en la consola
        console.log('Credenciales inválidas');
  
        // Puedes mostrar un mensaje de error al usuario en la interfaz de usuario si lo deseas
      }
    });
  }
  
  
  getAlumnos() {
    this.http.get(`${this.apiUrl}/Alumnos`).subscribe((alumnos: any[]) => {
      // 'alumnos' contiene la lista de alumnos recuperados del servidor
      console.log('Alumnos recuperados:', alumnos);
      // Aquí puedes agregar la lógica para verificar el RUT y la contraseña
    });
  }

  isValidRut(rut: string): boolean {
    // Expresión regular para validar RUT sin punto ni guión con dígito verificador
    const rutPattern = /^\d{7,8}-?(\d|k|K)$/;
    if (!rutPattern.test(rut)) {
      return false; // El formato del RUT es incorrecto
    }
  
    // Extraer el número y el dígito verificador
    const [rutNumber, rutDv] = rut.split('-');
    // Validar el dígito verificador
    return this.calculateDv(rutNumber) === rutDv.toUpperCase();
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
