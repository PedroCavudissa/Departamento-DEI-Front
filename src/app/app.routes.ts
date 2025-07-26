import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuAdminComponent } from './Admin-Secretaria/menu-admin/menu-admin.component';
import { TelaNotasComponent } from './Estudante/tela-notas/tela-notas.component';
import { CadeiraComponent } from './Estudante/Cadeiras/cadeira.component';
import { Confirmacao1Component } from './Estudante/confirmacao1/confirmacao1.component';
import { Confirmacao2Component } from './Estudante/confirmacao2/confirmacao2.component';
import { Confirmacao3Component } from './Estudante/confirmacao3/confirmacao3.component';
import { AprovarComunicadoComponent } from './Admin-Secretaria/menu-admin/Configuracoes/aprovar-comunicado/aprovar-comunicado.component';
import { ComunicadoComponent } from './Admin-Secretaria/menu-admin/comunicado/comunicado.component';
import { MenuEstudantesComponent } from './Admin-Secretaria/menu-admin/estudantes/menu-estudantes.component';
import { DetalhesFuncionariosComponent } from './Admin-Secretaria/menu-admin/detalhes-funcionarios/detalhes-funcionarios.component';
import { DetalhesCadeirasComponent } from './Admin-Secretaria/menu-admin/detalhes-cadeiras/detalhes-cadeiras.component';
import { DetalhesEstudantesComponent } from './Admin-Secretaria/menu-admin/detalhes-estudantes/detalhes-estudantes.component';
import { CalendarioComponent } from './Admin-Secretaria/menu-admin/calendario/calendario.component';
import { PautaComponent } from './Admin-Secretaria/menu-admin/pauta/pauta.component';
import { TelaProfessorComponent } from './Professor/tela-professor/tela-professor.component';
import { PerfilProfessorComponent } from './Professor/perfil-professor/perfil-professor.component';
import { CalendarioNormalComponent } from './Admin-Secretarias/menu-secretaria/calendario-secretaria/calendario-normal.component';
import { MenuSecretariaComponent } from './Admin-Secretarias/menu-secretaria/menu-secretaria.component';
import { ChatSecretariaComponent } from './Admin-Secretarias/menu-secretaria/chat-secretaria/chat-secretaria.component';
import { ChatComponent } from './Admin-Secretaria/menu-admin/chat/chat.component';
import { ComunicadoSecretariaComponent } from './Admin-Secretarias/menu-secretaria/comunicado-secretaria/comunicado-secretaria.component';
import { DetalhesCadeirasSecretariaComponent } from './Admin-Secretarias/menu-secretaria/detalhes-cadeiras-secretaria/detalhes-cadeiras-secretaria.component';
import { DetalhesEstudantesSecretariaComponent } from './Admin-Secretarias/menu-secretaria/detalhes-estudantes-secretaria/detalhes-estudantes-secretaria.component';
import { DetalhesFuncionariosSecretariaComponent } from './Admin-Secretarias/menu-secretaria/detalhes-funcionarios-secretaria/detalhes-funcionarios-secretaria.component';
import { MenuEstudantesSecretariaComponent } from './Admin-Secretarias/menu-secretaria/estudantes-secretaria/menu-estudantes-secretaria.component';
import { FuncionariosSecretariaComponent } from './Admin-Secretarias/menu-secretaria/funcionario-secretaria/funcionarios-secretaria.component';
import { PerfilEstudanteComponent } from './Estudante/perfil-estudante/perfil-estudante.component';
import { GerirPerfilComponent } from './Admin-Secretaria/menu-admin/Configuracoes/Gerirperfis/GerirPerfil.component';
import { HorarioComponent } from './Admin-Secretaria/menu-admin/horario/horario.component';
import { VerPautaSecretariaComponent } from './Admin-Secretarias/menu-secretaria/ver-pauta-secretaria/ver-pauta-secretaria.component';
import { HorarioSecretariaComponent } from './Admin-Secretarias/menu-secretaria/horario-secretaria/horario-secretaria.component';
import { HorarioEstudanteComponent } from './Estudante/horario-estudante/horario-estudante.component';
import { HorarioProfessorComponent } from './Professor/horario-professor/horario-professor.component';
import { ConfiguracoesComponent } from './Admin-Secretaria/menu-admin/Configuracoes/configuracoes.component';
import { VerPautaComponent } from './Admin-Secretaria/menu-admin/ver-pauta/ver-pauta.component';
import { ChatEstudanteComponent } from './Estudante/chat-estudante/chat-estudante.component';
import { ChatProfessorComponent } from './Professor/chat-professor/chat-professor.component';

import { CalendarioProfessorComponent } from './Professor/calendario-professor/calendario-professor.component';
import { CalendarioEstudanteComponent } from './Estudante/calendario-estudante/calendario-estudante.component';
import { LancamentoComponent } from './Professor/lancamento/lancamento.component';
import { CadastroFuncionarioComponent } from './Admin-Secretaria/menu-admin/Configuracoes/cadastro-funcionario/cadastro-funcionario.component';
import { TelaEstudanteComponent } from './Estudante/tela-estudante/tela-estudante.component';
import { AuthGuard } from './guards/auth.guard';
import { ComunicadoProfessorComponent } from './Professor/comunicado-professor/comunicado-professor.component';
import { ComunicadoEstudanteComponent } from './Estudante/comunicado-estudante/comunicado-estudante.component';
import { FuncionariosComponent } from './Admin-Secretaria/menu-admin/TelaFuncionario/TelaFuncionario.component';
import { MaisDetalhesEstudantesComponent } from './Admin-Secretaria/menu-admin/mais-detalhes-estudantes/mais-detalhes-estudantes.component';
import { CadastroComponent } from './Admin-Secretarias/menu-secretaria/cadastro/cadastro.component';
import { ConfirmacoesComponent } from './Admin-Secretarias/menu-secretaria/confirmacoes/confirmacoes.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  // Rotas para Admin-Master (Acesso Geral)
  { path: 'cadastro-funcionario', component: CadastroFuncionarioComponent, canActivate: [AuthGuard],data: { role: ['ADMINISTRADOR'] } },
  { path: 'menu-admin', component: MenuAdminComponent, canActivate: [AuthGuard] ,data: { role: ['ADMINISTRADOR'] }},
  { path: 'aprovar-comunicado', component: AprovarComunicadoComponent, canActivate: [AuthGuard],data: { role: ['ADMINISTRADOR'] } },
  { path: 'comunicado', component: ComunicadoComponent, canActivate: [AuthGuard],data: { role: ['ADMINISTRADOR'] } },
  { path: 'menu-estudantes', component: MenuEstudantesComponent, canActivate: [AuthGuard],data: { role: ['ADMINISTRADOR'] } },
  { path: 'detalhes-funcionarios', component: DetalhesFuncionariosComponent, canActivate: [AuthGuard] ,data: { role: ['ADMINISTRADOR'] }},
  { path: 'detalhes-cadeiras', component: DetalhesCadeirasComponent, canActivate: [AuthGuard],data: { role: ['ADMINISTRADOR'] } },
  { path: 'detalhes-estudantes', component: DetalhesEstudantesComponent, canActivate: [AuthGuard],data: { role: ['ADMINISTRADOR'] } },
  { path: 'Configuracoes', component: ConfiguracoesComponent, canActivate: [AuthGuard] ,data: { role: ['ADMINSTRADOR'] }},
  { path: 'Gerirperfis', component: GerirPerfilComponent, canActivate: [AuthGuard] },
  { path: 'mais-detalhes-estudantes', component: MaisDetalhesEstudantesComponent, canActivate: [AuthGuard] ,data: { role: ['ADMINISTRADOR'] }},
  { path: 'funcionarios', component: FuncionariosComponent, canActivate: [AuthGuard] ,data: { role: ['ADMINISTRADOR'] }},
  { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard],data: { role: ['ADMINISTRADOR'] } },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] ,data: { role: ['ADMINISTRADOR'] }},
  { path: 'pauta', component: PautaComponent, canActivate: [AuthGuard] ,data: { role: ['ADMINISTRADOR'] }},
  { path: 'pautas', component: PautaComponent, canActivate: [AuthGuard],data: { role: ['ADMINISTRADOR'] } },
  { path: 'ver-pauta', component: VerPautaComponent, canActivate: [AuthGuard],data: { role: ['ADMINISTRADOR'] } },
  { path: 'horario', component: HorarioComponent, canActivate: [AuthGuard] ,data: { role: ['ADMINISTRADOR'] }},
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] ,data: { role: ['ADMINISTRADOR'] }},
  { path: 'Tela-Funcionario', component: FuncionariosComponent, canActivate: [AuthGuard],data: { role: ['ADMINISTRADOR'] } },

  // Estudante
  { path: 'tela-notas', component: TelaNotasComponent, canActivate: [AuthGuard],data: { role: ['ESTUDANTE'] } },
  { path: 'tela-estudante', component: TelaEstudanteComponent, canActivate: [AuthGuard] ,data: { role: ['ESTUDANTE'] } },
  { path: 'cadeira', component: CadeiraComponent, canActivate: [AuthGuard],data: { role: ['ESTUDANTE'] }  },
  { path: 'confirmacao1', component: Confirmacao1Component, canActivate: [AuthGuard],data: { role: ['ESTUDANTE'] }  },
  { path: 'confirmacao2', component: Confirmacao2Component, canActivate: [AuthGuard],data: { role: ['ESTUDANTE'] }  },
  { path: 'confirmacao3', component: Confirmacao3Component, canActivate: [AuthGuard] ,data: { role: ['ESTUDANTE'] } },
  { path: 'perfil-estudante', component: PerfilEstudanteComponent, canActivate: [AuthGuard] ,data: { role: ['ESTUDANTE'] } },
  { path: 'horario-estudante', component: HorarioEstudanteComponent, canActivate: [AuthGuard] ,data: { role: ['ESTUDANTE'] } },
  { path: 'chat-estudante', component: ChatEstudanteComponent, canActivate: [AuthGuard],data: { role: ['ESTUDANTE'] }  },
  { path: 'calendario-estudante', component: CalendarioEstudanteComponent, canActivate: [AuthGuard] ,data: { role: ['ESTUDANTE'] } },
  { path: 'comunicado-estudante', component: ComunicadoEstudanteComponent, canActivate: [AuthGuard] ,data: { role: ['ESTUDANTE'] } },

  // Professor
  { path: 'tela-professor', component: TelaProfessorComponent, canActivate: [AuthGuard] ,data: { role: ['PROFESSOR'] } },
  { path: 'perfil-professor', component: PerfilProfessorComponent, canActivate: [AuthGuard],data: { role: ['PROFESSOR'] }  },
  { path: 'horario-professor', component: HorarioProfessorComponent, canActivate: [AuthGuard],data: { role: ['PROFESSOR'] }  },
  { path: 'chat-professor', component: ChatProfessorComponent, canActivate: [AuthGuard] ,data: { role: ['PROFESSOR'] } },
  { path: 'lancamento', component: LancamentoComponent, canActivate: [AuthGuard] ,data: { role: ['PROFESSOR'] } },
  { path: 'calendario-professor', component: CalendarioProfessorComponent, canActivate: [AuthGuard],data: { role: ['PROFESSOR'] }  },
  { path: 'comunicado-professor', component: ComunicadoProfessorComponent, canActivate: [AuthGuard] ,data: { role: ['PROFESSOR'] } },

  // Secretaria
  { path: 'menu-secretaria', component: MenuSecretariaComponent, canActivate: [AuthGuard] ,data: { role: ['SECRETARIA'] } },
  { path: 'chat-secretaria', component: ChatSecretariaComponent, canActivate: [AuthGuard] ,data: { role: ['SECRETARIA'] } },
  { path: 'calendario-normal', component: CalendarioNormalComponent, canActivate: [AuthGuard] ,data: { role: ['SECRETARIA'] } },
  { path: 'comunicado-secretaria', component: ComunicadoSecretariaComponent, canActivate: [AuthGuard] ,data: { role: ['SECRETARIA'] } },
  { path: 'detalhes-cadeiras-secretaria', component: DetalhesCadeirasSecretariaComponent, canActivate: [AuthGuard],data: { role: ['SECRETARIA'] }  },
  { path: 'detalhes-estudantes-secretaria', component: DetalhesEstudantesSecretariaComponent, canActivate: [AuthGuard],data: { role: ['SECRETARIA'] }  },
  { path: 'detalhes-funcionarios-secretaria', component: DetalhesFuncionariosSecretariaComponent, canActivate: [AuthGuard] ,data: { role: ['SECRETARIA'] } },
  { path: 'ver-pauta-secretaria', component: VerPautaSecretariaComponent, canActivate: [AuthGuard] ,data: { role: ['SECRETARIA'] } },
  { path: 'funcionario-secretaria', component: FuncionariosSecretariaComponent, canActivate: [AuthGuard] ,data: { role: ['SECRETARIA'] } },
  { path: 'horario-secretaria', component: HorarioSecretariaComponent, canActivate: [AuthGuard] ,data: { role: ['SECRETARIA'] } },
  { path: 'confirmacoes', component: ConfirmacoesComponent, canActivate: [AuthGuard],data: { role: ['SECRETARIA'] }  },
  {path:'acesso-negado',component: AcessoNegadoComponent}
];