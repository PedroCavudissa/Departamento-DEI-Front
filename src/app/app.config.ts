import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';


import { LoginService } from './services/login.service';
import { LacamentoNotasService } from './services/lacamento-notas.service';

import { EstudanteService} from './services/estudante.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuService } from './services/menu.service';
import { DisciplinaService } from './services/disciplina.service';



export interface LoginResponse {
  token: string;
  role: 'admin' | 'secretaria' | 'estudante' | 'professor';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
       provideHttpClient(),

    importProvidersFrom(HttpClientModule),LoginService,LacamentoNotasService,DisciplinaService,MenuService

  ]


};


