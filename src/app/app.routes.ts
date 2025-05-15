import { Routes } from '@angular/router';
import { LoginComponent } from './Admin-Secretaria/login/login.component';
import { MenuComponent } from './Admin-Secretaria/menu/menu.component';
import { TelaNotasComponent } from './Estudante/tela-notas/tela-notas.component';
import { TelaEstudanteComponent } from './Estudante/tela-estudante/tela-estudante.component';
import { CadeiraComponent } from './Estudante/Cadeiras/cadeira.component';
import { Confirmacao1Component } from './Estudante/confirmacao1/confirmacao1.component';
import { Confirmacao2Component } from './Estudante/confirmacao2/confirmacao2.component';
import { MenuEstudantesComponent } from './Admin-Secretaria/menu/estudantes/menu-estudantes.component';
import { DetalhesFuncionariosComponent } from './Admin-Secretaria/menu/detalhes-funcionarios/detalhes-funcionarios.component';
import { DetalhesCadeirasComponent } from './Admin-Secretaria/menu/detalhes-cadeiras/detalhes-cadeiras.component';

import { ChatComponent } from './Admin-Secretaria/menu/chat/chat.component';
import { DetalhesEstudantesComponent } from './Admin-Secretaria/menu/detalhes-estudantes/detalhes-estudantes.component';
import { MaisDetalhesEstudantesComponent } from './Admin-Secretaria/menu/mais-detalhes-estudantes/mais-detalhes-estudantes.component';
import { TelaFuncionariosComponent } from './Admin-Secretaria/menu/tela-funcionarios/tela-funcionarios.component';
import { CalendarioComponent } from './Admin-Secretaria/menu/calendario/calendario.component';
import { PautaComponent } from './Admin-Secretaria/menu/pauta/pauta.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireciona pra login ao abrir
  { path: 'login', component: LoginComponent },

  { path: 'menu', component: MenuComponent },
  { path: 'tela-notas', component: TelaNotasComponent },
  { path: 'tela-estudante', component: TelaEstudanteComponent },
  { path: 'cadeira', component: CadeiraComponent },
  { path: 'confirmacao1', component: Confirmacao1Component },
  { path: 'confirmacao2', component: Confirmacao2Component },
  { path: 'menu-estudantes', component: MenuEstudantesComponent },
  { path: 'detalhes-funcionarios', component: DetalhesFuncionariosComponent },
  { path: 'detalhes-cadeiras', component: DetalhesCadeirasComponent },
  { path: 'detalhes-estudantes', component: DetalhesEstudantesComponent },
  {
    path: 'mais-detalhes-estudantes',
    component: MaisDetalhesEstudantesComponent,
  },
  { path: 'chat', component: ChatComponent },
  { path: 'tela-funcionarios', component: TelaFuncionariosComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'pautas', component: PautaComponent }
];
