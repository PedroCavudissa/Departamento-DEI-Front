<<<<<<< HEAD
// estudante.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Estudante } from '../interface/estudante.interface';
=======

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
>>>>>>> Dev

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {
<<<<<<< HEAD
  private apiUrl = 'https://5df5-102-214-36-223.ngrok-free.app/api/estudantes'; // URL da API

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error('Erro de conexão com o servidor'));
    } else if (error.status === 200) {
      // https://96a0-102-218-85-117.ngrok-free.app/swagger-ui/index.html

///https://5df5-102-214-36-223.ngrok-free.app/swagger-ui/index.html#
      // Verifica se a resposta é HTML quando deveria ser JSON
      if (typeof error.error === 'string' && error.error.startsWith('<!DOCTYPE html>')) {
        return throwError(() => new Error('O servidor retornou uma página HTML em vez de dados JSON'));
      }
      return throwError(() => new Error('Resposta inesperada do servidor'));
    } else {
      return throwError(() => new Error(`Erro ${error.status}: ${error.message}`));
    }
  }

  getEstudanteById(id: number): Observable<Estudante> {
  return this.http.get(`${this.apiUrl}/${id}`, {
    responseType: 'text', // Recebe como texto primeiro
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    })
  }).pipe(
    map(response => {
      try {
        return JSON.parse(response) as Estudante;
      } catch (e) {
        throw new Error('Resposta não é um JSON válido');
      }
    }),
    catchError(this.handleError)
  );
}
}

/*
  getEstudantes(): Observable<Estudante[]> {
    return this.http.get(this.apiUrl, {
      responseType: 'text', // Primeiro recebe como texto
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true' // Adiciona header para bypass do ngrok
      })
    }).pipe(
      map(response => {
        // Tenta converter para JSON
        try {
          return JSON.parse(response);
        } catch (e) {
          throw new Error('Resposta não é um JSON válido');
        }
      }),
      catchError(this.handleError)
    );
  }
}*/
  














=======
  cadastrar(estudante: Estudante) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://14f411305204.ngrok-free.app/api'; // URL da API


  constructor(private http: HttpClient) { }
/*
  private getHeaders(acceptJson: boolean = true): HttpHeaders {
  const token = localStorage.getItem('token') || '';
  const base = {
    'Authorization': `Bearer ${token}`
  };

  if (acceptJson) {
    return new HttpHeaders({
      ...base,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  return new HttpHeaders(base);
}
*/
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
>>>>>>> Dev




