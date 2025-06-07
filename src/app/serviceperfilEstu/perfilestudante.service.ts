import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Estudante } from '../interface/estudante.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilestudanteService {

 private apiUrl = 'https://dd3f-102-218-85-31.ngrok-free.app/api/estudantes'; // URL da API

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => new Error('Erro de conexão com o servidor'));
    } else if (error.status === 200) {
      
      // https://96a0-102-218-85-117.ngrok-free.app/swagger-ui/index.html


      // Verifica se a resposta é HTML quando deveria ser JSON
      if (typeof error.error === 'string' && error.error.startsWith('<!DOCTYPE html>')) {
        return throwError(() => new Error('O servidor retornou uma página HTML em vez de dados JSON'));
      }
      return throwError(() => new Error('Resposta inesperada do servidor'));
    } else {
      return throwError(() => new Error(`Erro ${error.status}: ${error.message}`));
    }
  }

  getEstudantes(): Observable<Estudante[]> {
    return this.http.get(this.apiUrl, {
      responseType: 'text', // Primeiro recebe como texto
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true' // Adiciona header para bypass do ngrok
      })
    }).pipe(
      map((response: string) => {
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
}
 

