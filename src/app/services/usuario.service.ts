import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private baseUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, {
      headers: this.getHeaders()
    });
  }


  atualizarStatusUsuario(userId: number, status: boolean): Observable<any> {
    
    const payload = {
      active: status
    };

    console.log('Enviando payload:', payload);
    
    return this.http.put(`${this.baseUrl}/users/${userId}/status`, payload, {
      headers: this.getHeaders()
    }).pipe(
      tap(response => console.log('Resposta do servidor:', response)),
      catchError(error => {
        console.error('Erro detalhado na requisição:', error);
        throw error;
      })
    );
  }
  
  enviarEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email }, {
      headers: this.getHeaders()
    }).pipe(
      tap(response => console.log('Email enviado com sucesso:', response)),
      catchError(error => {
        console.error('Erro ao enviar email:', error);
        throw error;
      })
    );
  }
}
