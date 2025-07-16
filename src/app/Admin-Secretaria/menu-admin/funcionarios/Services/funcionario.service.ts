import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Funcionario {
  id: number;
  nome: string;
  dataNascimento: string;
  numDocumento: string;
  tipoDocumento: string;
  endereco: string;
  nivelAcademico: string;
  cargo: string;
  dataIngresso: string;
}

interface FuncionarioResponse {
  content: Funcionario[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = 'https://73f02505a9f7.ngrok-free.app/api/staff';

  constructor(private http: HttpClient) {}

  carregarTodosFuncionarios(): Observable<Funcionario[]> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.warn('Token não encontrado no localStorage!');
    }

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      'Authorization': `Bearer ${token || ''}`
    });

    return this.http.get<FuncionarioResponse>(this.apiUrl, { headers }).pipe(
      map(response => response?.content ?? []),
      catchError(error => {
        console.error('Erro ao carregar funcionários:', error);
        const mensagem = error.status === 0
          ? 'Sem conexão com o servidor'
          : `Erro ${error.status}: ${error.statusText || 'ao carregar dados dos funcionários'}`;
        return throwError(() => new Error(mensagem));
      })
    );
  }
}
