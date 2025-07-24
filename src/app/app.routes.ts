
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
 import { CadastroComponent } from './Admin-Secretarias/menu-secretaria/cadastro/cadastro.component';
import { CalendarioProfessorComponent } from './Professor/calendario-professor/calendario-professor.component';
import { CalendarioEstudanteComponent } from './Estudante/calendario-estudante/calendario-estudante.component';
import { LancamentoComponent } from './Professor/lancamento/lancamento.component';
import { VerPautaProfessorComponent } from './Professor/ver-pauta-professor/ver-pauta-professor.component';
import { CadastroFuncionarioComponent } from './Admin-Secretaria/menu-admin/Configuracoes/cadastro-funcionario/cadastro-funcionario.component';
import { TelaEstudanteComponent } from './Estudante/tela-estudante/tela-estudante.component';
import { AuthGuard } from './guards/auth.guard';

import { ComunicadoEstudanteComponent } from './Estudante/comunicado-estudante/comunicado-estudante.component';
import { FuncionariosComponent } from './Admin-Secretaria/menu-admin/TelaFuncionario/TelaFuncionario.component';
<<<<<<< HEAD

import { ComunicadoProfessorComponent } from './Professor/comunicado-professor/comunicado-professor.component';
import { ConfirmacoesComponent } from './Admin-Secretarias/menu-secretaria/confirmacoes/confirmacoes.component';
import { ComunicadoSecretariaComponent } from './Admin-Secretarias/menu-secretaria/comunicado-secretaria/comunicado-secretaria.component';
=======
import { Component } from '@angular/core';
>>>>>>> 03b93fcc0b44aaf11a29a5a4fcc93f3ebdb79b4b
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //Rotas para o Admin-Master(Acesso Geral)

{path:'cadastro-funcionario', component: CadastroFuncionarioComponent, canActivate: [AuthGuard]},
  { path: 'menu-admin', component: MenuAdminComponent, canActivate: [AuthGuard] },
  { path: 'aprovar-comunicado', component: AprovarComunicadoComponent, canActivate: [AuthGuard] },
  { path: 'comunicado', component: ComunicadoComponent, canActivate: [AuthGuard] },
  { path: 'menu-estudantes', component: MenuEstudantesComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-funcionarios', component: DetalhesFuncionariosComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-cadeiras', component: DetalhesCadeirasComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-estudantes', component: DetalhesEstudantesComponent, canActivate: [AuthGuard] },
  { path: 'Configuracoes', component: ConfiguracoesComponent, canActivate: [AuthGuard] },
  { path: 'Gerirperfis', component: GerirPerfilComponent, canActivate: [AuthGuard] },
  { path: 'funcionarios', component: FuncionariosSecretariaComponent, canActivate: [AuthGuard]},
  { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'pautas', component: PautaComponent, canActivate: [AuthGuard] },
  { path: 'ver-pauta', component: VerPautaComponent, canActivate: [AuthGuard] },
  { path: 'horario', component: HorarioComponent, canActivate: [AuthGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] },
{path:'Tela-Funcionario', component: FuncionariosComponent, canActivate: [AuthGuard]},



  { path: 'menu-admin', component: MenuAdminComponent , canActivate: [AuthGuard]},
  { path: 'aprovarComunicado', component: AprovarComunicadoComponent , canActivate: [AuthGuard] },
  { path: 'comunicado', component: ComunicadoComponent , canActivate: [AuthGuard] },
  { path: 'menu-estudantes', component: MenuEstudantesComponent , canActivate: [AuthGuard] },
  { path: 'detalhes-funcionarios', component: DetalhesFuncionariosComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-cadeiras', component: DetalhesCadeirasComponent , canActivate: [AuthGuard]},
  { path: 'detalhes-estudantes', component: DetalhesEstudantesComponent, canActivate: [AuthGuard] },
  { path: 'Configuracoes', component: ConfiguracoesComponent , canActivate: [AuthGuard]},
  { path: 'Gerirperfis', component: GerirPerfilComponent , canActivate: [AuthGuard]},
  { path: 'calendario', component: CalendarioComponent , canActivate: [AuthGuard]},
  { path: 'chat', component: ChatComponent , canActivate: [AuthGuard]},
  { path: 'ver-pauta', component: VerPautaComponent, canActivate: [AuthGuard] },
  { path: 'horario', component: HorarioComponent , canActivate: [AuthGuard]},
  { path: 'cadastro', component: CadastroComponent , canActivate: [AuthGuard]},
  { path: 'pauta', component: PautaComponent , canActivate: [AuthGuard]},
  { path: 'pautas', component: PautaComponent , canActivate: [AuthGuard]},
  { path: 'ver-pauta', component: VerPautaComponent , canActivate: [AuthGuard]},
  { path: 'horario', component: HorarioComponent , canActivate: [AuthGuard]},
 { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] },

  // Estudante

  { path: 'tela-notas', component: TelaNotasComponent, canActivate: [AuthGuard] },
  { path: 'tela-estudante', component: TelaEstudanteComponent, canActivate: [AuthGuard] },
  { path: 'cadeira', component: CadeiraComponent , canActivate: [AuthGuard]},
  { path: 'confirmacao1', component: Confirmacao1Component, canActivate: [AuthGuard] },
  { path: 'confirmacao2', component: Confirmacao2Component, canActivate: [AuthGuard] },
  { path: 'confirmacao3', component: Confirmacao3Component , canActivate: [AuthGuard]},
  { path: 'perfil-estudante', component: PerfilEstudanteComponent , canActivate: [AuthGuard]},
  { path: 'horario-estudante', component: HorarioEstudanteComponent , canActivate: [AuthGuard]},
  { path: 'chat-estudante', component: ChatEstudanteComponent , canActivate: [AuthGuard]},
  { path: 'calendario-estudante', component: CalendarioEstudanteComponent , canActivate: [AuthGuard]},
  { path: 'comunicado-estudante', component: ComunicadoEstudanteComponent, canActivate: [AuthGuard] },

  // Professor
  { path: 'tela-professor', component: TelaProfessorComponent , canActivate: [AuthGuard]},
  { path: 'perfil-professor', component: PerfilProfessorComponent, canActivate: [AuthGuard] },
  { path: 'horario-professor', component: HorarioProfessorComponent, canActivate: [AuthGuard] },
  { path: 'chat-professor', component: ChatProfessorComponent, canActivate: [AuthGuard] },
  { path: 'lancamento', component: LancamentoComponent , canActivate: [AuthGuard]},
  { path: 'calendario-professor', component: CalendarioProfessorComponent, canActivate: [AuthGuard] },

  { path: 'ver-pauta-professor', component: VerPautaProfessorComponent, canActivate: [AuthGuard] },

  { path: 'comunicado-professor', component: ComunicadoProfessorComponent, canActivate: [AuthGuard] }
  // Secretaria
  { path: 'menu-secretaria', component: MenuSecretariaComponent , canActivate: [AuthGuard]},
  { path: 'chat-secretaria', component: ChatSecretariaComponent, canActivate: [AuthGuard] },
  { path: 'calendario-normal', component: CalendarioNormalComponent, canActivate: [AuthGuard] },
  { path: 'comunicado-secretaria', component: ComunicadoSecretariaComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-cadeiras-secretaria', component: DetalhesCadeirasSecretariaComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-estudantes-secretaria', component: DetalhesEstudantesSecretariaComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-funcionarios-secretaria', component: DetalhesFuncionariosSecretariaComponent, canActivate: [AuthGuard] },
  { path: 'ver-pauta-secretaria', component: VerPautaSecretariaComponent , canActivate: [AuthGuard]},
  { path: 'funcionario-secretaria', component: FuncionariosSecretariaComponent, canActivate: [AuthGuard] },
  { path: 'horario-secretaria', component: HorarioSecretariaComponent , canActivate: [AuthGuard]},
  {path:'confirmacoes', component: ConfirmacoesComponent, canActivate: [AuthGuard]},


];
