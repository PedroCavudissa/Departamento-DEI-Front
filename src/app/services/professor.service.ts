import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserDetails {
  id: number;
  dataNascimento: string;
  numDocumento: string;
  tipoDocumento: string;
  endereco: string;
  cargo: string;
  dataIngresso: string;
  nivelAcademico: number;
  curriculo: string;
  [key: string]: any;
}

export interface Usuario {
  email: string;
  nome: string;
  userDetails: Partial<UserDetails>;
}

export interface Professor {
  nome?: string;
  email: string;
  userDetails: UserDetails;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // Corrigido: retorna apenas HttpHeaders
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

  // Obter perfil
  getPerfilUsuario(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/me`, {
      headers: this.getHeaders()
    });
  }

  // Atualizar perfil
  atualizarPerfil(id: number, dadosAtualizados: Partial<Professor>): Observable<Professor> {
    return this.http.patch<Professor>(`${this.baseUrl}/staff/${id}`, dadosAtualizados, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Tratar erros
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro na requisição:', error);
    return throwError(() => new Error('Erro ao processar a requisição.'));
  }


}
