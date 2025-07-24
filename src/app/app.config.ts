import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';

import { LoginService } from './services/login.service';
import { LacamentoNotasService } from './services/lacamento-notas.service';
import { DisciplinaService } from './services/disciplina.service';
import { MenuService } from './services/menu.service';

import { AuthInterceptor } from './interceptors/auth.interceptor';

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
    MenuService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};