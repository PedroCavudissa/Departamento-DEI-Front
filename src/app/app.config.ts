import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { LoginService } from './Services/login.service';
import { LancamentoService } from './Services/lacamento-notas.service';
import { DisciplinaService } from './services/disciplina.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuService } from './Services/menu.service';

import { AuthInterceptor } from './interceptors/auth.interceptor'; // ajuste o caminho conforme seu projeto

// Interface de resposta de login
export interface LoginResponse {
  token: string;
  role: 'admin' | 'secretaria' | 'estudante' | 'professor';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    LoginService,
    LancamentoService,
    DisciplinaService,
    MenuService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
