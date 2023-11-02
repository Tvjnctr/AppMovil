import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logoutAndNavigateToHome() {
    // Aquí puedes realizar la lógica de cierre de sesión (por ejemplo, borrar tokens, limpiar la sesión, etc.).

    // Luego, navega a la página de inicio.
    this.router.navigate(['/home']);
  }
}
