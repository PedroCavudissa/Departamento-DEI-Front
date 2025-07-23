import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private baseUrl = 'https://479c7344b8ab.ngrok-free.app/api/auth';

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
    return this.http.get(`${this.baseUrl}/users?page=0&size=100`, {
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
  
  
}
