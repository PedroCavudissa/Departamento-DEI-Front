import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Comunicado } from '../models/comunicado.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComunicadoService {
  private apiUrl =
    `${environment.apiUrl}/api/departamento/notices/list `;

  constructor(private http: HttpClient) {}

  getTodosComunicados(): Observable<Comunicado[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
    });

    return this.http.get<Comunicado[]>(this.apiUrl, { headers }).pipe(
      tap((data) => console.log('Comunicados recebidos:', data)),
      map((comunicados) =>
        comunicados.map((c) => ({
          ...c,
          dataAcontecimento: this.formatarData(c.dataAcontecimento),
          dataPublicacao: this.formatarData(c.dataPublicacao),
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
