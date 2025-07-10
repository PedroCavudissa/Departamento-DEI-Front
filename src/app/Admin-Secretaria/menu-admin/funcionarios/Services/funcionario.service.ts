import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

export interface Funcionario {
  id: number;
  nome: string;
  dataNascimento: string;
  numDocumento: string;
  tipoDocumento: string;
  endereco: string;
  nivelAcademico: string;
  curriculo?: any;
  cargo: string;
  dataIngresso: string;
  createdAt: string;
  updatedAt: string;
}

export interface FuncionarioPage {
  content: Funcionario[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  pageable?: any;
  last?: boolean;
  first?: boolean;
  empty?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = 'https://81b1776c3cd8.ngrok-free.app/api/staff';

  constructor(private http: HttpClient) {}

  listarFuncionarios(
    filtroFuncao: string = '', 
    pesquisaNome: string = '',
    page: number = 0,
    size: number = 10
  ): Observable<FuncionarioPage> {
    const token = localStorage.getItem('token');
    //const token = localStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      'Authorization': `Bearer ${token || ''}`
    });

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filtroFuncao) {
      params = params.set('cargo', filtroFuncao);
    }
    if (pesquisaNome) {
      params = params.set('nome', pesquisaNome.trim());
    }

    return this.http.get<FuncionarioPage>(this.apiUrl, { 
      headers,
      params,
      observe: 'response'
    }).pipe(
      map(response => {
        // Verificação robusta da resposta
        if (!response.body) {
          throw new Error('Resposta vazia do servidor');
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error('Resposta não é JSON válido');
        }

        return response.body;
      }),
      retry(1), // Tentar novamente uma vez em caso de falha
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro completo:', error);

    if (error.status === 0) {
      return throwError(() => new Error('Erro de conexão com o servidor'));
    } else if (error.status === 401) {
      return throwError(() => new Error('Não autorizado - faça login novamente'));
    } else if (error.status === 404) {
      return throwError(() => new Error('Endpoint não encontrado'));
    } else if (error.status === 500) {
      return throwError(() => new Error('Erro interno do servidor'));
    } else if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error(`Erro do cliente: ${error.error.message}`));
    } else {
      return throwError(() => new Error(
        error.error?.message || 
        `Erro ${error.status}: ${error.statusText}` || 
        'Erro desconhecido'
      ));
    }
  }

  // Método adicional para criar funcionário
  criarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<Funcionario>(this.apiUrl, funcionario, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
}