import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';

// Definindo o appConfig com o tipo ApplicationConfig corretamente configurado
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};



