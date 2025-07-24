import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {

  // Usar a URL base do environment para facilitar mudança
  private baseUrl = `${environment.apiUrl}/api/auth/login`;

  constructor(private http: HttpClient) {}

  entrar(credentials: { email: string; password: string }) {
    return this.http.post(this.baseUrl, credentials);
  }
}
