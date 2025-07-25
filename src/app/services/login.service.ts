import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  
  private baseUrl = `${environment.apiUrl}/api/auth/login`;

  constructor(private http: HttpClient) {}

  entrar(credentials: { email: string; password: string }) {
    return this.http.post(this.baseUrl, credentials);
  }
  sair() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${environment.apiUrl}/api/auth/logOut`, {}, { headers });
  }
}
