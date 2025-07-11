

// estudante.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

// Defina interfaces mais flexíveis
interface UserDetails {
  id: number;
  dataNascimento?: string;
  numIdentificacao?: string;
  tipoDocumento?: string;
  endereco?: string;
  contacto?: string;
  anoAcademico?: number;
  dataIngresso?: string;
  dataConclusao?: string;
  statusEstudante?: string;
  [key: string]: any; // Permite propriedades adicionais
}

export interface Estudante {
  nome?: string;
  userDetails: UserDetails;
  [key: string]: any; // Permite propriedades adicionais
}
@Injectable({
  providedIn: 'root'
})
export class EstudanteService {

  cadastrar(estudante: Estudante) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://5e457bae9840.ngrok-free.app/api'; // URL da API


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

getEstudante(): Observable<Estudante> {
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
      return JSON.parse(response) as Estudante;
    }),
    catchError(error => {
      if (error.status === 0) {
        return throwError(() => new Error('Erro de conexão com o servidor. Verifique: \n1. Se o servidor está online\n2. Se o ngrok está ativo\n3. Se a URL está correta'));
      }
      return throwError(() => error);
    })
  );
}
atualizarPerfil(id: number, dadosAtualizados: Partial<Estudante>): Observable<Estudante> {
  return this.http.patch<Estudante>(`${this.apiUrl}/departamento/students/${id}`, dadosAtualizados, {
    headers: this.getHeaders()
  });
}

}





