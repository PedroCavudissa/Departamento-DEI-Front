
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Disciplina {
  id: number;
  sigla: string;
  nome: string;
  ano_academico: string;
  precedencia: string;
  semestre: string;
}

@Injectable({ providedIn: 'root' })
export class DisciplinaService {
  private apiUrl = 'https://4118-102-214-36-111.ngrok-free.app/api/disciplina/list/1';

  constructor(private http: HttpClient) {}

  listarDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }
}
