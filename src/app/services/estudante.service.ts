
// estudante.service.ts
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LogRegistro } from './logs.service';

export interface Estudante {
  nome: string;
  dataNascimento: string; 
  numIdentificacao: string;
  tipoDocumento: string;
  endereco: string;
  contacto: string;
  anoAcademico: number;
  dataIngresso: string;
  email: string;
  instituicaoAnterior: string;
  notaExameAcesso: number;
  notaEnsinoMedio: number;
  regimeIngresso: string;
  dataConclusao:  string;
  statusEstudante: string;
   userDetails?: any; 
}

@Injectable({ providedIn: 'root' })
export class EstudanteService {
  private apiUrl = `${environment.apiUrl}/api/departamento/students`;

  constructor(private http: HttpClient) {}

  cadastrar(estudante: Estudante): Observable<any> {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;
  
    console.log('Token JWT:', token);
    console.log('Estudante a ser cadastrado:', estudante);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  
    return this.http.post(this.apiUrl, estudante, { headers });
  }
  
  getEstudantesPorAno(ano: number): Observable<Estudante[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  
    const url = `${environment.apiUrl}/api/departamento/students/academic-year/${ano}`;
  
    return this.http.get<Estudante[]>(url, { headers }).pipe(
      map(res => res || []), 
      catchError(err => {
        console.error('❌ Erro ao buscar estudantes:', err);
        return of([]);
      })
    );
  }
  
  getLogsEstudantes(): Observable<LogRegistro[]> {
    return this.http.get<any[]>('/api/estudantes').pipe(
      map(estudantes => estudantes.map(est => ({
        acao: 'Criou estudante',
        entidade: 'Estudante',
        entidadeId: est.id,
        criadoPor: est.createdBy?.nome || est.createdBy?.id || 'Desconhecido',
        data: est.createdAt,
      })))
    );
  }

  }
  
  


