import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { MenuService } from './Services/menu.service';
import { LoginService } from './services/login.service';
import { LancamentoService } from './Services/lacamento-notas.service';
import { DisciplinaService } from './Services/disciplina.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),MenuService,LoginService,LancamentoService,DisciplinaService
  ]
};
