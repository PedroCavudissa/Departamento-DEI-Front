
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../enviroments/environment';

// Defina interfaces 
interface UserDetails {
  id: number;
  dataNascimento: string;
  numDocumento: string;
  tipoDocumento: string;
  endereco: string;
  cargo: string;
  dataIngresso: string;
  nivelAcademico: number;
  curriculo: string;

 

  [key: string]: any; // Permite propriedades adicionais
}

export interface Professor {
  nome?: string;
  email: string;
  userDetails: UserDetails;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  cadastrar(professor: Professor) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || '';
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      })
    };
  }

  getProfessor(): Observable<Professor> {
    return this.http.get<Professor>(`${this.baseUrl}/auth/me`, this.getHeaders());
  }


atualizarPerfil(id: number, dadosAtualizados: Partial<Professor>): Observable<Professor> {
  return this.http.patch<Professor>(`${this.baseUrl}/staff/${id}`, dadosAtualizados, 
    this.getHeaders()
  );
}
} 










/*
atualizarPerfil(id: number, dadosAtualizados: Partial<Professor>): Observable<Professor> {
  // Corrigido: usando template literals corretamente
  return this.http.patch<Professor>(`${this.apiUrl}/staff/${id}`, dadosAtualizados, {
    headers: this.getHeaders()
  }).pipe(
    catchError(this.handleError)
  );
}
*/
