import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AlunoPauta {
  id: number;
  estudanteNome: string;
  disciplinaNome: string;
  ac1?: number;
  ac2?: number;
  p1?: number;
  p2?: number;
  ms?: number;
  rs?: string;
  exame?: number;
  exameRecurso?: number;
  exameOral?: number;
  exameEspecial?: number;
  pagamento?: string;
  mediaFinal?: number
}

export interface DisciplinaResponse {
  content: Disciplina[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
export interface Disciplina {
  id: number;
  sigla: string;
  nome: string;
  anoAcademico: number;
  semestre: number;
  precedenciasDisciplinaNome: string[];
}


@Injectable({ providedIn: 'root' })
export class MenuService {
  private baseUrl = 'https://ed37ccb8f819.ngrok-free.app/api';

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

  listarPautas(modelo: string, anoLetivo: number, disciplinaId: number): Observable<AlunoPauta[]> {
    const params = new HttpParams()
      .set('modelo', modelo)
      .set('anoLetivo', anoLetivo.toString())
      .set('disciplinaId', disciplinaId.toString());

    return this.http.get<AlunoPauta[]>(
      `${this.baseUrl}/departamento/studentsubject/listar/pautas`,
      { ...this.getHeaders(), params }
    );
  }

  getDisciplinas(page: number = 0, size: number = 10): Observable<DisciplinaResponse> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  return this.http.get<DisciplinaResponse>(
    `${this.baseUrl}/subject/list`,
    { ...this.getHeaders(), params }
  );
}

}