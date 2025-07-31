import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

export interface ProfessorDisciplina {
  id: number;
  funcionarioId?: number;
  funcionarioNome: string;
  disciplinaNome: string;
  disciplinaId: number;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioCadeiraService {
  private baseUrl = `${environment.apiUrl}/api/departamento/staffsubject`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  }

  listar(): Observable<Page<ProfessorDisciplina>> {
    return this.http.get<Page<ProfessorDisciplina>>(this.baseUrl, {
      headers: this.getHeaders()
    });
  }
  
  

  associar(dado: ProfessorDisciplina): Observable<any> {
    return this.http.post(this.baseUrl, dado, { headers: this.getHeaders() });
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { headers: this.getHeaders() });
  }
}
