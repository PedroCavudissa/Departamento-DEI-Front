
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuAdminComponent } from './Admin-Secretaria/menu-admin/menu-admin.component';
import { TelaNotasComponent } from './Estudante/tela-notas/tela-notas.component';
import { CadeiraComponent } from './Estudante/Cadeiras/cadeira.component';
import { Confirmacao1Component } from './Estudante/confirmacao1/confirmacao1.component';
import { Confirmacao2Component } from './Estudante/confirmacao2/confirmacao2.component';

import { AprovarComunicadoComponent } from './Admin-Secretaria/menu-admin/Configuracoes/aprovar-comunicado/aprovar-comunicado.component';

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
import { DadoProfessorComponent } from '../../../Departamento-DEI-Front-Dev/dado-professor/dado-professor.component';

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
 //import { CadastroComponent } from './Admin-Secretaria/menu-admin/cadastro/cadastro.component';
import { CalendarioProfessorComponent } from './Professor/calendario-professor/calendario-professor.component';
import { CalendarioEstudanteComponent } from './Estudante/calendario-estudante/calendario-estudante.component';
import { LancamentoComponent } from './Professor/lancamento/lancamento.component';
import { CadastroFuncionarioComponent } from './Admin-Secretaria/menu-admin/cadastro-funcionario/cadastro-funcionario.component';
import { TelaEstudanteComponent } from './Estudante/tela-estudante/tela-estudante.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  //Rotas para o Admin-Master(Acesso Geral)
 

{path:'cadastro-funcionario', component: CadastroFuncionarioComponent},
  { path: 'menu-admin', component: MenuAdminComponent },
  { path: 'aprovarComunicado', component: AprovarComunicadoComponent },
  { path: 'comunicado', component: ComunicadoComponent },
  { path: 'menu-estudantes', component: MenuEstudantesComponent },
  { path: 'detalhes-funcionarios', component: DetalhesFuncionariosComponent },
  { path: 'detalhes-cadeiras', component: DetalhesCadeirasComponent },
  { path: 'detalhes-estudantes', component: DetalhesEstudantesComponent },

  { path: 'Configuracoes', component: ConfiguracoesComponent },
  { path: 'Gerirperfis', component: GerirPerfilComponent },
  { path: 'mais-detalhes-estudantes', component: MaisDetalhesEstudantesComponent },

  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'pautas', component: PautaComponent },

  { path: 'ver-pauta', component: VerPautaComponent },
  { path: 'horario', component: HorarioComponent },
 // { path: 'cadastro', component: CadastroComponent },
 

  // Estudante

  { path: 'tela-notas', component: TelaNotasComponent },
  { path: 'tela-estudante', component: TelaEstudanteComponent },
  { path: 'cadeira', component: CadeiraComponent },
  { path: 'confirmacao1', component: Confirmacao1Component },
  { path: 'confirmacao2', component: Confirmacao2Component },
  { path: 'perfil-estudante', component: PerfilEstudanteComponent },
  { path: 'horario-estudante', component: HorarioEstudanteComponent },
  { path: 'chat-estudante', component: ChatEstudanteComponent },
  { path: 'calendario-estudante', component: CalendarioEstudanteComponent },

  // Professor
  { path: 'tela-professor', component: TelaProfessorComponent },
  { path: 'dado-professor', component: DadoProfessorComponent },
  { path: 'perfil-professor', component: PerfilProfessorComponent },
  { path: 'horario-professor', component: HorarioProfessorComponent },
  { path: 'chat-professor', component: ChatProfessorComponent },
  { path: 'lancamento', component: LancamentoComponent },
  { path: 'calendario-professor', component: CalendarioProfessorComponent },

  // Secretaria

  { path: 'menu-secretaria', component: MenuSecretariaComponent },
  { path: 'chat-secretaria', component: ChatSecretariaComponent },
  { path: 'calendario-normal', component: CalendarioNormalComponent },
  { path: 'comunicado-secretaria', component: ComunicadoSecretariaComponent },
  { path: 'detalhes-cadeiras-secretaria', component: DetalhesCadeirasSecretariaComponent },
  { path: 'detalhes-estudantes-secretaria', component: DetalhesEstudantesSecretariaComponent },
  { path: 'detalhes-funcionarios-secretaria', component: DetalhesFuncionariosSecretariaComponent },
  { path: 'mais-detalhes-funcionarios-secretaria', component: MaisDetalhesEstudantesSecretariaComponent },
  { path: 'estudantes-secretaria', component: MenuEstudantesSecretariaComponent },

  { path: 'ver-pauta-secretaria', component: VerPautaSecretariaComponent },
  { path: 'funcionario-secretaria', component: FuncionariosSecretariaComponent },
  { path: 'horario-secretaria', component: HorarioSecretariaComponent },

];
/*
import { Routes } from '@angular/router';

// Importações agrupadas por módulo/funcionalidade
// Admin
import { MenuAdminComponent } from './Admin-Secretaria/menu-admin/menu-admin.component';
import { AprovarComunicadoComponent } from './Admin-Secretaria/menu-admin/Configuracoes/aprovar-comunicado/aprovar-comunicado.component';
import { ComunicadoComponent } from './Admin-Secretaria/menu-admin/comunicado/comunicado.component';
import { MenuEstudantesComponent } from './Admin-Secretaria/menu-admin/estudantes/menu-estudantes.component';
import { DetalhesFuncionariosComponent } from './Admin-Secretaria/menu-admin/detalhes-funcionarios/detalhes-funcionarios.component';
import { DetalhesCadeirasComponent } from './Admin-Secretaria/menu-admin/detalhes-cadeiras/detalhes-cadeiras.component';
import { DetalhesEstudantesComponent } from './Admin-Secretaria/menu-admin/detalhes-estudantes/detalhes-estudantes.component';
import { MaisDetalhesEstudantesComponent } from './Admin-Secretaria/menu-admin/mais-detalhes-estudantes/mais-detalhes-estudantes.component';
import { CalendarioComponent } from './Admin-Secretaria/menu-admin/calendario/calendario.component';
import { PautaComponent } from './Admin-Secretaria/menu-admin/pauta/pauta.component';
import { FuncionariosComponent } from './Admin-Secretaria/menu-admin/funcionarios/funcionarios.component';
import { ChatComponent } from './Admin-Secretaria/menu-admin/chat/chat.component';
import { VerPautaComponent } from './Admin-Secretaria/menu-admin/ver-pauta/ver-pauta.component';
import { HorarioComponent } from './Admin-Secretaria/menu-admin/horario/horario.component';
import { ConfiguracoesComponent } from './Admin-Secretaria/menu-admin/Configuracoes/configuracoes.component';
import { GerirPerfilComponent } from './Admin-Secretaria/menu-admin/Configuracoes/Gerirperfis/GerirPerfil.component';
import { CadastroFuncionarioComponent } from './Admin-Secretaria/menu-admin/cadastro-funcionario/cadastro-funcionario.component';

// Secretaria
import { MenuSecretariaComponent } from './Admin-Secretarias/menu-secretaria/menu-secretaria.component';
import { ChatSecretariaComponent } from './Admin-Secretarias/menu-secretaria/chat-secretaria/chat-secretaria.component';
import { CalendarioNormalComponent } from './Admin-Secretarias/menu-secretaria/calendario-secretaria/calendario-normal.component';
import { ComunicadoSecretariaComponent } from './Admin-Secretarias/menu-secretaria/comunicado-secretaria/comunicado-secretaria.component';
import { DetalhesCadeirasSecretariaComponent } from './Admin-Secretarias/menu-secretaria/detalhes-cadeiras-secretaria/detalhes-cadeiras-secretaria.component';
import { DetalhesEstudantesSecretariaComponent } from './Admin-Secretarias/menu-secretaria/detalhes-estudantes-secretaria/detalhes-estudantes-secretaria.component';
import { DetalhesFuncionariosSecretariaComponent } from './Admin-Secretarias/menu-secretaria/detalhes-funcionarios-secretaria/detalhes-funcionarios-secretaria.component';
import { MaisDetalhesEstudantesSecretariaComponent } from './Admin-Secretarias/menu-secretaria/mais-detalhes-estudantes-secretaria/mais-detalhes-estudantes-secretaria.component';
import { MenuEstudantesSecretariaComponent } from './Admin-Secretarias/menu-secretaria/estudantes-secretaria/menu-estudantes-secretaria.component';
import { FuncionariosSecretariaComponent } from './Admin-Secretarias/menu-secretaria/funcionario-secretaria/funcionarios-secretaria.component';
import { VerPautaSecretariaComponent } from './Admin-Secretarias/menu-secretaria/ver-pauta-secretaria/ver-pauta-secretaria.component';
import { HorarioSecretariaComponent } from './Admin-Secretarias/menu-secretaria/horario-secretaria/horario-secretaria.component';

// Estudante
import { TelaNotasComponent } from './Estudante/tela-notas/tela-notas.component';
import { CadeiraComponent } from './Estudante/Cadeiras/cadeira.component';
import { Confirmacao1Component } from './Estudante/confirmacao1/confirmacao1.component';
import { Confirmacao2Component } from './Estudante/confirmacao2/confirmacao2.component';
import { PerfilEstudanteComponent } from './Estudante/perfil-estudante/perfil-estudante.component';
import { HorarioEstudanteComponent } from './Estudante/horario-estudante/horario-estudante.component';
import { ChatEstudanteComponent } from './Estudante/chat-estudante/chat-estudante.component';
import { CalendarioEstudanteComponent } from './Estudante/calendario-estudante/calendario-estudante.component';

// Professor
import { TelaProfessorComponent } from './Professor/tela-professor/tela-professor.component';
import { DadoProfessorComponent } from './Professor/dado-professor/dado-professor.component';
import { PerfilProfessorComponent } from './Professor/perfil-professor/perfil-professor.component';
import { HorarioProfessorComponent } from './Professor/horario-professor/horario-professor.component';
import { ChatProfessorComponent } from './Professor/chat-professor/chat-professor.component';
import { LancamentoComponent } from './Professor/lancamento/lancamento.component';
import { CalendarioProfessorComponent } from './Professor/calendario-professor/calendario-professor.component';

// Login
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  // Rota padrão
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Rotas para Admin
  {
    path: 'admin',
    component: MenuAdminComponent,
    children: [
      { path: 'cadastro-funcionario', component: CadastroFuncionarioComponent },
      { path: 'aprovar-comunicado', component: AprovarComunicadoComponent },
      { path: 'comunicado', component: ComunicadoComponent },
      { path: 'menu-estudantes', component: MenuEstudantesComponent },
      { path: 'detalhes-funcionarios', component: DetalhesFuncionariosComponent },
      { path: 'detalhes-cadeiras', component: DetalhesCadeirasComponent },
      { path: 'detalhes-estudantes', component: DetalhesEstudantesComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'gerir-perfis', component: GerirPerfilComponent },
      { path: 'mais-detalhes-estudantes', component: MaisDetalhesEstudantesComponent },
      { path: 'funcionarios', component: FuncionariosComponent },
      { path: 'calendario', component: CalendarioComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'pautas', component: PautaComponent },
      { path: 'ver-pauta', component: VerPautaComponent },
      { path: 'horario', component: HorarioComponent }
    ]
  },

  // Rotas para Secretaria
  {
    path: 'secretaria',
    component: MenuSecretariaComponent,
    children: [
      { path: 'chat', component: ChatSecretariaComponent },
      { path: 'calendario', component: CalendarioNormalComponent },
      { path: 'comunicado', component: ComunicadoSecretariaComponent },
      { path: 'detalhes-cadeiras', component: DetalhesCadeirasSecretariaComponent },
      { path: 'detalhes-estudantes', component: DetalhesEstudantesSecretariaComponent },
      { path: 'detalhes-funcionarios', component: DetalhesFuncionariosSecretariaComponent },
      { path: 'mais-detalhes-estudantes', component: MaisDetalhesEstudantesSecretariaComponent },
      { path: 'estudantes', component: MenuEstudantesSecretariaComponent },
      { path: 'ver-pauta', component: VerPautaSecretariaComponent },
      { path: 'funcionarios', component: FuncionariosSecretariaComponent },
      { path: 'horario', component: HorarioSecretariaComponent }
    ]
  },

  // Rotas para Estudante
  {
    path: 'estudante',
    children: [
      { path: 'notas', component: TelaNotasComponent },
      { path: 'cadeiras', component: CadeiraComponent },
      { path: 'confirmacao1', component: Confirmacao1Component },
      { path: 'confirmacao2', component: Confirmacao2Component },
      { path: 'perfil', component: PerfilEstudanteComponent },
      { path: 'horario', component: HorarioEstudanteComponent },
      { path: 'chat', component: ChatEstudanteComponent },
      { path: 'calendario', component: CalendarioEstudanteComponent }
    ]
  },

  // Rotas para Professor
  {
    path: 'professor',
    children: [
      { path: 'tela', component: TelaProfessorComponent },
      { path: 'dados', component: DadoProfessorComponent },
      { path: 'perfil', component: PerfilProfessorComponent },
      { path: 'horario', component: HorarioProfessorComponent },
      { path: 'chat', component: ChatProfessorComponent },
      { path: 'lancamento', component: LancamentoComponent },
      { path: 'calendario', component: CalendarioProfessorComponent }
    ]
  },

  // Rota de fallback (404)
  { path: '**', redirectTo: 'login' }
];*/
