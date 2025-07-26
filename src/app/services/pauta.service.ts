import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Estudante {
  estudanteNome: string;
  ac1: number;
  ac2: number;
  p1: number;
  p2: number;
  exame: number;
  exameRecurso: number;
  exameOral: number;
  exameEspecial: number;
}

export interface Disciplina {
  disciplinaId: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class PautaService {
  private baseUrl =  `${environment.apiUrl}/api`;

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


  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.baseUrl}/solicitacoes-edicao-notas/listar`, this.getHeaders());
  }

getEstudantesComNotas(disciplinaId: number): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(
      `${this.baseUrl}/departamento/StudentSubjectEdit/${disciplinaId}`,
      this.getHeaders()
    );
  }

 avaliarPauta(disciplinaId: number, aprovada: boolean, motivoRejeicao?: string): Observable<any> {
  const body: any = { disciplinaId, aprovada };
  if (!aprovada && motivoRejeicao) {
    body.motivoRejeicao = motivoRejeicao;
  }

  return this.http.patch(
    `${this.baseUrl}/solicitacoes-edicao-notas/avaliar`,
    body,
    this.getHeaders()
  );
}
}