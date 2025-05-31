import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DisciplinaEmAtraso {
  id: number;
  nome: string;
  ano: number;
}

@Injectable({ providedIn: 'root' })
export class DisciplinaService {
  private apiUrl = 'http://localhost:8080/api/alunos';

  constructor(private http: HttpClient) {}

  getDisciplinas(alunoId: number): Observable<DisciplinaEmAtraso[]> {
    return this.http.get<DisciplinaEmAtraso[]>(`${this.apiUrl}/${alunoId}/disciplinas-em-atraso`);
  }
}
