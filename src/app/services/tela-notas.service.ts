import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DisciplinaNota, NotaFilter } from '../models/nota.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TelaNotasService {
  private  baseUrl = `${environment.apiUrl}/api/departamento/students/list/minhasnotas`;

  constructor(private http: HttpClient) {}

  // Função para obter os headers com token JWT
  private getHeaders(): HttpHeaders {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    });
  }

  // Função principal para buscar as notas com filtros
  getNotas(filters: NotaFilter): Observable<DisciplinaNota[]> {
    // Validação do modelo
    if (!filters.modelo) {
      return throwError(() => new Error('O modelo é obrigatório'));
    }

    // Configuração dos parâmetros de busca
    let params = new HttpParams().set('modelo', filters.modelo);

    if (filters.anoLetivo) {
      params = params.set('anoLetivo', filters.anoLetivo.toString());
    }

    // Requisição HTTP com headers e filtros
    return this.http
      .get<DisciplinaNota[]>(this.baseUrl, {
        params,
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Tratamento de erros da API
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

    if (error.status === 403) {
      return throwError(() => 'Acesso negado. Você não tem permissão.');
    }

    return throwError(() => 'Erro ao carregar notas. Tente novamente mais tarde.');
  }
}
