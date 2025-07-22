import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private baseUrl = environment.apiUrl; // Exemplo: 'https://seu-backend/api'

  constructor(private http: HttpClient) {}

  entrar(credentials: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/api/auth/login`, credentials);
  }

  recuperarSenha(dados: { email: string; senha: string }) {
    return this.http.post(`${this.baseUrl}/api/auth/recuperar-senha`, dados);
  }
}
