import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'https://cef3-102-214-36-154.ngrok-free.app/api/auth/login';

  constructor(private http: HttpClient) {}

  entrar(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}`, credentials);
  }

}
