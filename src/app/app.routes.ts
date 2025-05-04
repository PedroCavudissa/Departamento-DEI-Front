import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { TelaNotasComponent } from './tela-notas/tela-notas.component';
import { TelaEstudanteComponent } from './tela-estudante/tela-estudante.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireciona pra login ao abrir
  { path: 'login', component: LoginComponent },
 // { path: 'menu', component: MenuComponent },
 // {path:'tela',component:TelaNotasComponent},
  {path:'tela-estudante',component:TelaEstudanteComponent}
];
