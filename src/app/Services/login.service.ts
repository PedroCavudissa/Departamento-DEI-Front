import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private apiUrl = 'https://7fa0-102-218-85-74.ngrok-free.app/api/auth/login';


  constructor(private http: HttpClient) {}

  entrar(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}`, credentials);
  }

}
