import { Routes } from '@angular/router';

import { LoginComponent } from './Admin-Secretaria/login/login.component';
import { MenuComponent } from './Admin-Secretaria/menu/menu.component';
import { TelaNotasComponent } from './Estudante/tela-notas/tela-notas.component';
import { TelaEstudanteComponent } from './Estudante/tela-estudante/tela-estudante.component';
import { CadeiraComponent } from './Estudante/Cadeiras/cadeira.component';
import { Confirmacao1Component } from './Estudante/confirmacao1/confirmacao1.component';
import { Confirmacao2Component } from './Estudante/confirmacao2/confirmacao2.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireciona pra login ao abrir
  { path: 'login', component: LoginComponent },

  { path: 'menu', component: MenuComponent },
  {path:'tela-notas',component:TelaNotasComponent},
  { path: 'tela-estudante', component: TelaEstudanteComponent },
  { path: 'cadeira', component: CadeiraComponent },
  { path: 'confirmacao1', component: Confirmacao1Component },
  { path: 'confirmacao2', component: Confirmacao2Component },

];
