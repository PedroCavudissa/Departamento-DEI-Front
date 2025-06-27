import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = '/auth/login';

  constructor(private http: HttpClient) {}

  entrar(credentials: { email: string; senha: string }) {
    return this.http.post(`${this.apiUrl}`, credentials);
  }

}
