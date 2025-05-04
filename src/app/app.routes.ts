import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { Confirmacao1Component } from './pages/confirmacao1/confirmacao1.component';
import { Confirmacao2Component } from './pages/confirmacao2/confirmacao2.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireciona pra login ao abrir
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'confirmacao1', component: Confirmacao1Component },
  { path: 'confirmacao2', component: Confirmacao2Component }
];
