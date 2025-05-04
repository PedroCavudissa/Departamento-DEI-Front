import { Routes } from '@angular/router';

import { LoginComponent } from './Admin-Secretaria/login/login.component';
import { MenuComponent } from './Admin-Secretaria/menu/menu.component';
import { TelaNotasComponent } from './Estudante/tela-notas/tela-notas.component';
import { TelaEstudanteComponent } from './Estudante/tela-estudante/tela-estudante.component';
import { CadeiraComponent } from './Estudante/Cadeiras/cadeira.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireciona pra login ao abrir
  { path: 'login', component: LoginComponent },

  { path: 'menu', component: MenuComponent },
  {path:'tela-notas',component:TelaNotasComponent},
  { path: 'tela-estudante', component: TelaEstudanteComponent },
  { path: 'cadeira', component: CadeiraComponent },

];
