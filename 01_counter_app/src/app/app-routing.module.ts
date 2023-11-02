import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then( m => m.AlumnoPageModule)
  },
  {
    path: 'profesor',
    loadChildren: () => import('./profesor/profesor.module').then( m => m.ProfesorPageModule)
  },
  {
    path: 'perfil-p',
    loadChildren: () => import('./perfil-p/perfil-p.module').then( m => m.PerfilPPageModule)
  },
  {
    path: 'login-p',
    loadChildren: () => import('./login-p/login-p.module').then( m => m.LoginPPageModule)
  },
  {
    path: 'asignatura-p',
    loadChildren: () => import('./asignatura-p/asignatura-p.module').then( m => m.AsignaturaPPageModule)
  },
  {
    path: 'asignatura-p1',
    loadChildren: () => import('./asignatura-p1/asignatura-p1.module').then( m => m.AsignaturaP1PageModule)
  },
  {
    path: 'restablecer-contra',
    loadChildren: () => import('./restablecer-contra/restablecer-contra.module').then( m => m.RestablecerContraPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
