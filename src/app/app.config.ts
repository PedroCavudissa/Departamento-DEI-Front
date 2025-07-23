import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DisciplinaService } from './Services/disciplina.service';

import { LoginService } from './services/login.service';


import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { LacamentoNotasService } from './services/lacamento-notas.service';

// Interface de resposta de login
export interface LoginResponse {
  token: string;
  role: 'admin' | 'secretaria' | 'estudante' | 'professor';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    LoginService,
    LacamentoNotasService,
    DisciplinaService,
   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};

export type NotaCampo =
  | 'ac1' | 'p1'
  | 'ac2' | 'p2'
  | 'ms' | 'exame' | 'recurso'
  | 'exameOral' | 'exameEspecial'
  | 'mf' | 'rs';

export interface NotaDisciplinaRequest {
  disciplina: string;
  modelo: ModeloNota;
  anoLetivo?: number;
}

export interface NotaDisciplinaBody {
  id?: number;
  estudanteNome?: string;
  disciplinaNome?: string;
  ac1?: number | null;
  p1?: number | null;
  ac2?: number | null;
  p2?: number | null;
  ms?: number | null;
  exame?: number | null;
  recurso?: number | null;
  exameOral?: number | null;
  exameEspecial?: number | null;
  mf?: number | null;
  rs?: string | null;
  mensagem?: string;
}

export interface NotaDisciplinaResponse {
  headers: Record<string, string>;
  body: NotaDisciplinaBody | string;
  statusCode: string;
  statusCodeValue: number;
}
export type ModeloNota = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type ResultadoStatus = 'APROVADO' | 'REPROVADO' | 'EM_CURSO' | 'TRANCADO' | 'DESISTIU';

export interface DisciplinaNota {
  id: number;
  estudanteNome: string;
  disciplinaNome: string;

  // Campos do Modelo A
  ac1?: number | null;
  p1?: number | null;

  // Campos do Modelo B
  ac2?: number | null;
  p2?: number | null;
  ms?: number | null;
  rs?: ResultadoStatus;

  // Campos do Modelo C
  exame?: number | null;
  mf?: number | null;

  // Campos do Modelo D
  recurso?: number | null;

  // Campos do Modelo E
  exameOral?: number | null;

  // Campos do Modelo F
  exameEspecial?: number | null;
}

export interface NotaFilter {
  modelo: ModeloNota;
  anoLetivo?: number;
}