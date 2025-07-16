
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../enviroments/environment';

// Defina interfaces 
interface UserDetails {
  id: number;
  dataNascimento?: string;
  numDocumento?: string;
  tipoDocumento?: string;
  endereco?: string;
  cargo?: string;
  dataIngresso?: string;
  nivelAcademico?: string;
  [key: string]: any; // Permite propriedades adicionais
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

  cadastrar(professor: Professor) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = `${environment.apiUrl}`; // URL da API

 constructor(private http: HttpClient) { }
   private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true' // Adicione esta linha para evitar avisos do ngrok
    });
  }
  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // Erro do lado do cliente
    return throwError(() => new Error('Erro de conexão: ' + error.error.message));
  } else {
    // Verifica se a resposta é HTML
    if (typeof error.error === 'string' && error.error.startsWith('<!DOCTYPE html>')) {
      return throwError(() => new Error('O servidor retornou uma página de erro HTML. Verifique: \n1. Se a URL está correta\n2. Se o servidor está online\n3. Se há problemas com o ngrok'));
    }
    
    // Tenta extrair a mensagem de erro do payload ngrok
    try {
      const payload = JSON.parse(error.error.split('data-payload="')[1].split('"')[0]);
      const decoded = atob(payload);
      return throwError(() => new Error(`Erro ngrok: ${decoded}`));
    } catch (e) {
      return throwError(() => new Error(`Erro ${error.status}: ${error.message}`));
    }
  }
}

getProfessor(): Observable<Professor> {
  return this.http.get(`${this.apiUrl}/auth/me`, {
    responseType: 'text',
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      'Accept': 'application/json',
      // Remova o header do ngrok se estiver causando problemas CORS
      // 'ngrok-skip-browser-warning': 'true'
    }),
    withCredentials: true // Importante para CORS em alguns casos
  }).pipe(
    map(response => {
      if (response.startsWith('<!DOCTYPE html>')) {
        throw new Error('Servidor retornou HTML em vez de JSON');
      }
      return JSON.parse(response) as Professor;
    }),
    catchError(error => {
      if (error.status === 0) {
        return throwError(() => new Error('Erro de conexão com o servidor. Verifique: \n1. Se o servidor está online\n2. Se o ngrok está ativo\n3. Se a URL está correta'));
      }
      return throwError(() => error);
    })
  );
}

atualizarPerfil(id: number, dadosAtualizados: Partial<Professor>): Observable<Professor> {
  // Corrigido: usando template literals corretamente
  return this.http.patch<Professor>(`${this.apiUrl}/staff/${id}`, dadosAtualizados, {
    headers: this.getHeaders()
  }).pipe(
    catchError(this.handleError)
  );
}
}











