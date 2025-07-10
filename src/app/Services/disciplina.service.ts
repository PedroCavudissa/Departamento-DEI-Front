
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';



export interface Disciplina {
  id: number;
  sigla: string;
  nome: string;
  ano: number;
  ano_academico: string;
  precedencia: string;
  semestre: string;
}
@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private apiUrl = 'https://5df5-102-214-36-223.ngrok-free.app/api/disciplina/list';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error('Erro de conexão com o servidor'));
    } else if (error.status === 200) {
      // Verifica se a resposta é HTML quando deveria ser JSON
      if (typeof error.error === 'string' && error.error.startsWith('<!DOCTYPE html>')) {
        return throwError(() => new Error('O servidor retornou uma página HTML em vez de dados JSON'));
      }
      return throwError(() => new Error('Resposta inesperada do servidor'));
    } else {
      return throwError(() => new Error(`Erro ${error.status}: ${error.message}`));

    }
  }
  getDisciplinas(): Observable<Disciplina[]> {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          throw new Error('Resposta não é um JSON válido');
        }
      }),
      catchError(this.handleError)
// eslint-disable-next-line no-irregular-whitespace
    );
// eslint-disable-next-line no-irregular-whitespace
  }
}