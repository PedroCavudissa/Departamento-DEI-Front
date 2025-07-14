import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private baseUrl = '/api/subject/atrasadas';

  constructor(private http: HttpClient) {}

  /**
   * Retorna as disciplinas em atraso para um determinado estudante.
   * @param estudanteId ID do estudante logado.
   */
  getDisciplinas(estudanteId: number): Observable<DisciplinaEmAtraso[]> {
    return this.http.get<DisciplinaEmAtraso[]>(`${this.baseUrl}/${estudanteId}`);
  }
}
