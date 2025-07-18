import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Comunicado } from '../models/comunicado.model';

interface ApiResponse {
  headers: Record<string, unknown>;
  body: Comunicado;
  statusCode: string;
  statusCodeValue: number;
}

@Injectable({
  providedIn: 'root',
})
export class ComunicadoService {
  private apiUrl = 'https://e199070f04ee.ngrok-free.app/api/departamento/notices/noticesForMe';

  constructor(private http: HttpClient) {}

  getTodosComunicados(): Observable<Comunicado[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.get<ApiResponse[]>(this.apiUrl, { headers }).pipe(
      tap((data) => console.log('Resposta da API:', data)),
      map((responses) =>
        responses.map(response => ({
          ...response.body,
          dataAcontecimento: this.formatarData(response.body.dataAcontecimento),
          dataPublicacao: this.formatarData(response.body.dataPublicacao),
        }))
      ),
      catchError((error: unknown) => {
        console.error('Erro ao carregar comunicados:', error);
        return throwError(() => this.handleError(error));
      })
    );
  }

  private formatarData(dataString: string): string {
    try {
      return new Date(dataString).toISOString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.warn('Erro ao formatar data:', dataString);
      return dataString;
    }
  }

  private handleError(error: unknown): Error {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401:
          return new Error('Token inválido ou expirado');
        case 403:
          return new Error('Acesso não autorizado');
        case 404:
          return new Error('Endpoint não encontrado');
        case 500:
          return new Error('Erro interno do servidor');
        default:
          return new Error(`Erro HTTP: ${error.status} - ${error.statusText}`);
      }
    } else if (error instanceof Error) {
      return error;
    } else if (typeof error === 'string') {
      return new Error(error);
    } else {
      return new Error('Erro desconhecido ao buscar comunicados');
    }
  }
}
