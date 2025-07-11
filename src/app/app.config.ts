import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';


import { LoginService } from './Services/login.service';
import { LancamentoService } from './Services/lacamento-notas.service';
//import { DisciplinaService } from './Services/disciplina.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuService } from './Services/menu.service';
import { DisciplinaService } from './Services/disciplina.service';



export interface LoginResponse {
  token: string;
  role: 'admin' | 'secretaria' | 'estudante' | 'professor';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),


    importProvidersFrom(HttpClientModule),LoginService,LancamentoService,DisciplinaService,MenuService

  ]


};
