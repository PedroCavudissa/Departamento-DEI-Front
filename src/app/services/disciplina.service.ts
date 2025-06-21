import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DisciplinaEmAtraso {
  id: number;
  nome: string;
  estudante: number;
  ano: number;
  semestre: number;
}

@Injectable({ providedIn: 'root' })
export class DisciplinaService {
  private apiUrl = '/api/subject/atrasadas';

  constructor(private http: HttpClient) {}

  getDisciplinas(estudanteId: number): Observable<DisciplinaEmAtraso[]> {
    return this.http.get<DisciplinaEmAtraso[]>(`${this.apiUrl}/${estudanteId}`);
  }
}
