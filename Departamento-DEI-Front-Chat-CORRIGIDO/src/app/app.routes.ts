import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ChatComponent } from './pages/chat/chat.component';
import { PautaComponent } from './pages/pauta/pauta.component';


export const routes: Routes = [
  { path: '', redirectTo: 'pauta', pathMatch: 'full' },
  { path: 'pauta', component: PautaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'chat', component: ChatComponent }
];