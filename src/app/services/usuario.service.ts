import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {


  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;
  
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/auth/users`, {
      headers: this.getHeaders()
    });
  }

  atualizarStatusUsuario(userId: number, status: boolean): Observable<any> {
    const url = `${environment.apiUrl}/api/auth/users/${userId}/status?active=${status}`;
  
    return this.http.put(url, null, {
      headers: this.getHeaders(),
      responseType: 'text' 
    }).pipe(
      tap(response => console.log('Resposta do servidor:', response)),
      catchError(error => {
        console.error('Erro detalhado na requisição:', error);
        throw error;
      })
    );
  }
  
  
  enviarEmail(email: string): Observable<any> {
    const url = `${environment.apiUrl}/api/auth/forgot-password?email=${encodeURIComponent(email)}`;
  
    return this.http.post(url, null).pipe(
      tap(response => console.log('Email enviado com sucesso:', response)),
      catchError(error => {
        console.error('Erro ao enviar email:', error);
        throw error;
      })
    );
  }
  
}
