
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
  private apiUrl = 'https://ab29-102-218-85-83.ngrok-free.app/api/disciplina/list';

  constructor(private http: HttpClient) {}

  listarDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }
}
