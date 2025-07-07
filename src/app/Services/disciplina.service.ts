import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface DisciplinaEmAtraso {
  id: number;
  nome: string;
  sigla?: string;
  ano_academico?: string;
  semestre?: string | number;
  precedencia?: string;
  ano?: number; // usado por cadeira.component.html
}


export interface Disciplina {
  id: number;
  nome: string;
  sigla: string;
  ano_academico: string;
  precedencia: string;
  semestre: string;
  detalhes: string;
}

@Injectable({ providedIn: 'root' })
export class DisciplinaService {
  private baseUrl = 'https://7fa0-102-218-85-74.ngrok-free.app/api/subject/atrasadas';

  constructor(private http: HttpClient) {}

  /**
   * Retorna as disciplinas em atraso para um determinado estudante.
   * @param estudanteId ID do estudante logado.
   */
  getDisciplinas(estudanteId: number): Observable<DisciplinaEmAtraso[]> {
    return this.http.get<DisciplinaEmAtraso[]>(`${this.baseUrl}/${estudanteId}`);
  }




getTotalCadeiras(): Observable<number> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  });

  const url = 'https://7fa0-102-218-85-74.ngrok-free.app/api/subject/total';

  return this.http.get<number>(url, { headers }).pipe(
    map(res => {
      console.log('✅ Resposta da API (getCadeiras):', res);
      return res ?? 0;
    })
  );
}

}