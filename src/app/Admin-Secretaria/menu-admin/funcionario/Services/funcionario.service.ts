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

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = 'https://64f433c9d322.ngrok-free.app/api/staff';

  constructor(private http: HttpClient) {}

  carregarTodosFuncionarios(): Observable<Funcionario[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });

    return this.http.get<{content: Funcionario[]}>(this.apiUrl, { headers }).pipe(
      map(response => response.content || []),
      catchError(error => {
        console.error('Erro ao carregar funcionários:', error);
        return throwError(() => new Error(
          error.status === 0 ? 'Sem conexão com o servidor' :
          'Erro ao carregar dados dos funcionários'
        ));
      })
    );
  }
}