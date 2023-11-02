import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restablecer-contra',
  templateUrl: 'restablecer-contra.page.html',
  styleUrls: ['restablecer-contra.page.scss'],
})

export class RestablecerContraPage {
  rutAlumno: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  cambiarContrasena() {
    if (this.nuevaContrasena === this.confirmarContrasena) {
      const requestBody = {
        rut: this.rutAlumno,
        nuevaContrasena: this.nuevaContrasena,
      };

      // Realiza una solicitud HTTP para actualizar la contraseña del alumno
      this.http.put('http://localhost:3000/Alumnos', requestBody).subscribe((response: any) => {
        if (response.success) {
          // Contraseña cambiada con éxito, redirige al alumno a la página de inicio de sesión
          this.router.navigate(['/home']);
        } else {
          // Ocurrió un error al cambiar la contraseña, muestra un mensaje de error
          alert('Ocurrió un error al cambiar la contraseña. Inténtalo de nuevo.');
        }
      });
    } else {
      // Las contraseñas no coinciden, muestra un mensaje de error al usuario
      alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
    }
  }
}