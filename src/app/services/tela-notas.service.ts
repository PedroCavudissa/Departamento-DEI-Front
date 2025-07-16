import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Interface para nota individual
export interface Nota {
  disciplina: string | null;
  cadeira: string | null;
  nota: number;
}

// Interface para disciplina
export interface Disciplina {
  id: number;
  sigla: string;
  nome: string;
  anoAcademico: number;
  semestre: number;
}

// Interface para resposta paginada
export interface PaginatedResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
}

@Injectable({ providedIn: 'root' })
export class TelaNotasService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://42f235bb2128.ngrok-free.app/api/departamento/students/list';
  private readonly disciplinaUrl = 'https://42f235bb2128.ngrok-free.app/api/subject/list';

  // Buscar disciplinas (com parse manual do texto)
  getDisciplinas(): Observable<Disciplina[]> {
    const params = new HttpParams().set('page', '0');

    return this.http.get(this.disciplinaUrl, { params, responseType: 'text' }).pipe(
      map(responseText => {
        console.log('Resposta bruta do servidor:', responseText);

        try {
          const response = JSON.parse(responseText);
          if (!response?.content || !Array.isArray(response.content)) {
            throw new Error('Resposta inválida da API: campo "content" ausente ou mal formatado.');
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
  buscarNotaPorDisciplina(disciplina: string, anoLetivo: number, modelo: string): Observable<Nota> {
    const params = new HttpParams()
      .set('anoLetivo', anoLetivo.toString())
      .set('modelo', modelo);

    return this.http.get<Nota>(`${this.baseUrl}/myscore/${disciplina}`, { params }).pipe(
      catchError((error: HttpErrorResponse) =>
        this.handleError<Nota>(error, 'Falha ao buscar nota')
      )
    );
  }

  // Listar todas as notas (corrigido para tratar resposta paginada)
  listarTodasNotas(anoLetivo: number, modelo: string): Observable<Nota[]> {
    const params = new HttpParams()
      .set('anoLetivo', anoLetivo.toString())
      .set('modelo', modelo);

    return this.http.get<PaginatedResponse<Nota>>(`${this.baseUrl}/minhasnotas`, { params }).pipe(
      map(response => {
        if (!response?.content || !Array.isArray(response.content)) {
          throw new Error('Resposta inválida da API: campo "content" ausente ou mal formatado.');
        }
        return response.content;
      }),
      catchError((error: HttpErrorResponse | Error) =>
        this.handleError<Nota[]>(error, 'Falha ao listar notas')
      )
    );
  }

  // Tratamento de erros
  private handleError<T>(error: HttpErrorResponse | Error, message: string): Observable<T> {
    console.error('Erro na requisição:', error);

    let errorMessage: string;

    if (
      error instanceof HttpErrorResponse &&
      error.status === 200 &&
      error.error instanceof ProgressEvent
    ) {
      errorMessage = `${message} - Problema ao processar resposta da API`;
    } else if (error instanceof HttpErrorResponse && error.error?.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `${message}${error instanceof HttpErrorResponse ? ` (Status ${error.status})` : ''}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
