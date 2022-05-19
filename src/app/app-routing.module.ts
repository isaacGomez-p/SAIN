import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'revision', loadChildren: () => import('./cliente/revision/revision.module').then(m => m.RevisionModule) },
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'hojaDeVida', loadChildren: () => import('./cliente/hoja-de-vida/hoja-de-vida.module').then(m => m.HojaDeVidaModule) },
  { path: 'formulario', loadChildren: () => import('./cliente/formulario/formulario.module').then(m => m.FormularioModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
