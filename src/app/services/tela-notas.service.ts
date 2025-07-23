import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Nota {
  disciplina: string | null;
  cadeira: string | null;
  nota: number;
}

export interface Disciplina {
  id: number;
  sigla: string;
  nome: string;
  anoAcademico: number;
  semestre: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
}

export interface NotaFilter {
  modelo: string;
  anoLetivo?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TelaNotasService {
  private readonly http = inject(HttpClient);

  // URLs atualizadas para environment ou fixas conforme necessidade
  private readonly baseUrl =
    'https://9c257c8cf488.ngrok-free.app/api/departamento/students/list';
  private readonly notasUrl = `${this.baseUrl}/minhasnotas`;
  private readonly disciplinasUrl =
    'https://42f235bb2128.ngrok-free.app/api/subject/list';

  constructor() {}

  // Buscar disciplinas (com parse manual do texto)
  getDisciplinas(): Observable<Disciplina[]> {
    const params = new HttpParams().set('page', '0');

    return this.http
      .get(this.disciplinasUrl, { params, responseType: 'text' })
      .pipe(
        map((responseText) => {
          console.log('Resposta bruta do servidor:', responseText);

          try {
            const response = JSON.parse(responseText);
            if (!response?.content || !Array.isArray(response.content)) {
              throw new Error(
                'Resposta inválida da API: campo "content" ausente ou mal formatado.'
              );
            }
            return response.content as Disciplina[];
          } catch (e) {
            throw new Error('Falha ao analisar JSON da resposta: ' + e);
          }
        }),
        catchError((error: HttpErrorResponse | Error) =>
          this.handleError<Disciplina[]>(error, 'Falha ao carregar disciplinas')
        )
      );
  }

  // Buscar nota por disciplina
  buscarNotaPorDisciplina(
    disciplina: string,
    anoLetivo: number,
    modelo: string
  ): Observable<Nota> {
    const params = new HttpParams()
      .set('anoLetivo', anoLetivo.toString())
      .set('modelo', modelo);

    return this.http
      .get<Nota>(`${this.baseUrl}/myscore/${disciplina}`, { params })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleError<Nota>(error, 'Falha ao buscar nota')
        )
      );
  }

  // Listar todas as notas, com filtro de modelo e anoLetivo
  getNotas(filters: NotaFilter): Observable<Nota[]> {
    if (!filters.modelo) {
      return throwError(() => new Error('O modelo é obrigatório'));
    }

    let params = new HttpParams().set('modelo', filters.modelo);

    if (filters.anoLetivo) {
      params = params.set('anoLetivo', filters.anoLetivo.toString());
    }

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http
      .get<PaginatedResponse<Nota>>(this.notasUrl, { params, headers })
      .pipe(
        map((response) => {
          if (!response?.content || !Array.isArray(response.content)) {
            throw new Error(
              'Resposta inválida da API: campo "content" ausente ou mal formatado.'
            );
          }
          return response.content;
        }),
        catchError((error: HttpErrorResponse | Error) =>
          this.handleError<Nota[]>(error, 'Falha ao carregar notas')
        )
      );
  }

  // Tratamento de erros genérico
  private handleError<T>(
    error: HttpErrorResponse | Error,
    message: string
  ): Observable<T> {
    console.error('Erro na requisição:', error);

    let errorMessage: string;

    if (
      error instanceof HttpErrorResponse &&
      error.status === 404
    ) {
      errorMessage = 'Nenhuma disciplina ou nota encontrada para os filtros selecionados';
    } else if (error instanceof HttpErrorResponse && error.status === 0) {
      errorMessage = 'Erro de conexão. Verifique sua internet.';
    } else if (
      error instanceof HttpErrorResponse &&
      error.status === 200 &&
      error.error instanceof ProgressEvent
    ) {
      errorMessage = `${message} - Problema ao processar resposta da API`;
    } else if (error instanceof HttpErrorResponse && error.error?.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = message + (error instanceof HttpErrorResponse ? ` (Status ${error.status})` : '');
    }

    return throwError(() => new Error(errorMessage));
  }
}
