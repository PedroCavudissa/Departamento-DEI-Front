import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {

  // Usar a URL base do environment para facilitar mudança
  private apiUrl = `${environment.apiUrl}/api/auth/login`;

  constructor(private http: HttpClient) {}

  entrar(credentials: { email: string; password: string }) {
    return this.http.post(this.apiUrl, credentials);
  }
}
