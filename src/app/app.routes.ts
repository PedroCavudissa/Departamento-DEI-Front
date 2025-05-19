import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuAdminComponent } from './Admin-Secretaria/menu-admin/menu-admin.component';
import { TelaNotasComponent } from './Estudante/tela-notas/tela-notas.component';
import { TelaEstudanteComponent } from './Estudante/tela-estudante/tela-estudante.component';
import { CadeiraComponent } from './Estudante/Cadeiras/cadeira.component';
import { Confirmacao1Component } from './Estudante/confirmacao1/confirmacao1.component';
import { Confirmacao2Component } from './Estudante/confirmacao2/confirmacao2.component';
import { AprovarComunicadoComponent } from './Admin-Secretaria/aprovar-comunicado/aprovar-comunicado.component';
import { ComunicadoComponent } from './Admin-Secretaria/menu-admin/comunicado/comunicado.component';
import { MenuEstudantesComponent } from './Admin-Secretaria/menu-admin/estudantes/menu-estudantes.component';
import { DetalhesFuncionariosComponent } from './Admin-Secretaria/menu-admin/detalhes-funcionarios/detalhes-funcionarios.component';
import { DetalhesCadeirasComponent } from './Admin-Secretaria/menu-admin/detalhes-cadeiras/detalhes-cadeiras.component';
import { DetalhesEstudantesComponent } from './Admin-Secretaria/menu-admin/detalhes-estudantes/detalhes-estudantes.component';
import { MaisDetalhesEstudantesComponent } from './Admin-Secretaria/menu-admin/mais-detalhes-estudantes/mais-detalhes-estudantes.component';
import { CalendarioComponent } from './Admin-Secretaria/menu-admin/calendario/calendario.component';
import { PautaComponent } from './Admin-Secretaria/menu-admin/pauta/pauta.component';
import { FuncionariosComponent } from './Admin-Secretaria/menu-admin/funcionarios/funcionarios.component';
import { TelaProfessorComponent } from './Professor/tela-professor/tela-professor.component';
import { DadoProfessorComponent } from './Professor/dado-professor/dado-professor.component';
import { PerfilProfessorComponent } from './Professor/perfil-professor/perfil-professor.component';
import { CalendarioNormalComponent } from './Admin-Secretarias/menu-secretaria/calendario-secretaria/calendario-normal.component';
import { MenuSecretariaComponent } from './Admin-Secretarias/menu-secretaria/menu-secretaria.component';
import { ChatSecretariaComponent } from './Admin-Secretarias/menu-secretaria/chat-secretaria/chat-secretaria.component';
import { ChatComponent } from './Admin-Secretaria/menu-admin/chat/chat.component';
import { ComunicadoSecretariaComponent } from './Admin-Secretarias/menu-secretaria/comunicado-secretaria/comunicado-secretaria.component';
import { DetalhesCadeirasSecretariaComponent } from './Admin-Secretarias/menu-secretaria/detalhes-cadeiras-secretaria/detalhes-cadeiras-secretaria.component';
import { DetalhesEstudantesSecretariaComponent } from './Admin-Secretarias/menu-secretaria/detalhes-estudantes-secretaria/detalhes-estudantes-secretaria.component';
import { DetalhesFuncionariosSecretariaComponent } from './Admin-Secretarias/menu-secretaria/detalhes-funcionarios-secretaria/detalhes-funcionarios-secretaria.component';
import { MaisDetalhesEstudantesSecretariaComponent } from './Admin-Secretarias/menu-secretaria/mais-detalhes-estudantes-secretaria/mais-detalhes-estudantes-secretaria.component';
import { MenuEstudantesSecretariaComponent } from './Admin-Secretarias/menu-secretaria/estudantes-secretaria/menu-estudantes-secretaria.component';
import { PautaSecretariaComponent } from './Admin-Secretarias/menu-secretaria/pauta-secretaria/pauta.component';
import { FuncionariosSecretariaComponent } from './Admin-Secretarias/menu-secretaria/funcionario-secretaria/funcionarios-secretaria.component';
import { PerfilEstudanteComponent } from './Estudante/perfil-estudante/perfil-estudante.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireciona pra login ao abrir

  //Rotas para o Admin-Master(Acesso Geral)
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuAdminComponent },
  { path: 'aprovarComunicado', component: AprovarComunicadoComponent },
  { path: 'comunicado', component: ComunicadoComponent },
  { path: 'menu-estudantes', component: MenuEstudantesComponent },
  { path: 'detalhes-funcionarios', component: DetalhesFuncionariosComponent },
  { path: 'detalhes-cadeiras', component: DetalhesCadeirasComponent },
  { path: 'detalhes-estudantes', component: DetalhesEstudantesComponent },
  {
    path: 'mais-detalhes-estudantes',
    component: MaisDetalhesEstudantesComponent,
  },
  { path: 'aprovar-comunicado', component: AprovarComunicadoComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'pautas', component: PautaComponent },
  //Rotas para os Estudantes
  { path: 'tela-notas', component: TelaNotasComponent },
  { path: 'tela-estudante', component: TelaEstudanteComponent },
  { path: 'cadeira', component: CadeiraComponent },
  { path: 'confirmacao1', component: Confirmacao1Component },
  { path: 'confirmacao2', component: Confirmacao2Component },

  { path: 'perfil-estudante', component: PerfilEstudanteComponent  },
    //Rotas para os Professores
  { path: 'tela-professor', component: TelaProfessorComponent },
  { path: 'dado-professor', component: DadoProfessorComponent },
  { path: 'perfil-professor', component: PerfilProfessorComponent},

  //Rotas para as Secretárias
  { path: 'menu-secretaria', component: MenuSecretariaComponent },
  { path: 'chat-secretaria', component: ChatSecretariaComponent },
  { path: 'calendario-normal', component: CalendarioNormalComponent },
  { path: 'comunicado-secretaria', component: ComunicadoSecretariaComponent },
  { path: 'detalhes-cadeiras-secretaria', component: DetalhesCadeirasSecretariaComponent },
  { path: 'detalhes-estudantes-secretaria', component: DetalhesEstudantesSecretariaComponent },
  { path: 'detalhes-funcionarios-secretaria', component: DetalhesFuncionariosSecretariaComponent },
  { path: 'mais-detalhes-funcionarios-secretaria', component: MaisDetalhesEstudantesSecretariaComponent },
  { path: 'estudantes-secretaria', component: MenuEstudantesSecretariaComponent },
  { path: 'pauta-secretaria', component: PautaSecretariaComponent },
  { path: 'funcionario-secretaria', component: FuncionariosSecretariaComponent },

];
