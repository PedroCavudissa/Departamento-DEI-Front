
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


export interface Disciplina {
  id: number;
  sigla: string;
  nome: string;
  ano_academico: string;
  precedencia: string;
  semestre: string;
}

export interface DisciplinaEmAtraso {
  id: number;
  sigla: string;
  nome: string;
  precedencia: number;
  semestre: string;
  ano_academico: string;
  ano:number
}


@Injectable({
  providedIn: 'root'

})



export class DisciplinaService {

  private baseUrl = 'https://7fa0-102-218-85-74.ngrok-free.app/api/subject/atrasadas';


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





getTotalCadeiras(): Observable<number> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  });

  const url = 'https://7fa0-102-218-85-74.ngrok-free.app/api/subject/total';

  return this.http.get<number>(url, { headers }).pipe(
    map(res => {
      console.log('✅ Resposta da API (getCadeiras):', res);
      return res ?? 0;
    })
  );
}
getDisciplinas(estudanteId: number): Observable<any[]> {
    return this.http.get<any[]>('sua-api-url/disciplinas');
  }


}