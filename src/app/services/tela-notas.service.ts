// src/app/tela-notas/services/tela-notas.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { DisciplinaNota, NotaFilter } from '../models/nota.model';

@Injectable({
  providedIn: 'root',
})
export class TelaNotasService {
  private readonly apiUrl =
    'https://e199070f04ee.ngrok-free.app/api/departamento/students/list/minhasnotas';

  constructor(private http: HttpClient) {}

  getNotas(filters: NotaFilter): Observable<DisciplinaNota[]> {
    // Validação do modelo
    if (!filters.modelo) {
      return throwError(() => new Error('O modelo é obrigatório'));
    }

    // Configuração dos parâmetros
    let params = new HttpParams().set('modelo', filters.modelo);

    if (filters.anoLetivo) {
      params = params.set('anoLetivo', filters.anoLetivo.toString());
    }

    // Configuração dos headers
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http
      .get<DisciplinaNota[]>(this.apiUrl, { params, headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro na requisição:', error);

    if (error.status === 404) {
      return throwError(
        () => 'Nenhuma disciplina encontrada para os filtros selecionados'
      );
    }

    if (error.status === 0) {
      return throwError(() => 'Erro de conexão. Verifique sua internet.');
    }

    return throwError(
      () => 'Erro ao carregar notas. Tente novamente mais tarde.'
    );
  }
}
