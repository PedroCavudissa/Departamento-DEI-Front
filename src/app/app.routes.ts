import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireciona pra login ao abrir
  { path: 'login', component: LoginComponent },
  { 
  path: 'menu',
    component: MenuComponent, // componente que contém o layout da barra lateral
    
  },

];
