// estudante.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Estudante } from '../interface/estudante.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {
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
  


















