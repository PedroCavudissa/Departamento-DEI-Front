import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface PedidoEdicaoNota {
  motivoRejeicao: string;
  estudanteNome: string;
  ac1: number;
  p1: number;
  ac2: number;
  p2: number;
  exame: number;
  exameRecurso: number;
  exameOral: number;
  exameEspecial: number;
}

export interface PautaEstudante {
  id: number;
  estudanteNome: string;
  disciplinaNome: string;
  ac1: number | null;
  ac2: number | null;
  p1: number | null;
  p2: number | null;
  ms: number | null;
  exame: number | null;
  exameRecurso: number | null;
  exameOral: number | null;
  exameEspecial: number | null;
}

export interface Disciplina {
  disciplinaId: number;
  nome: string;
}

export interface TipoPauta {
  codigo: number;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LacamentoNotasService {
  private baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  /* Headers reutilizáveis para todas as requisições */
  private getHeaders(): HttpHeaders {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  }

  getDadosDoProfessor(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/me`, { headers: this.getHeaders() });
  }

  getDisciplinasDoProfessor(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.baseUrl}/staff/MySubjects`, { headers: this.getHeaders() });
  }

  enviarExcel(file: File, disciplinaId: number, tipo: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // o backend espera "file"
  
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true'
    });
  
    const url = `${this.baseUrl}/departamento/studentsubject/upload?disciplinaId=${disciplinaId}&tipoP=${tipo}`;
  
    return this.http.post(url, formData, {
      headers,
      responseType: 'text' as 'json'
    });
  }
  

  baixarModeloExcel(disciplinaId: number, tipo: number): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/departamento/studentsubject/pauta/${disciplinaId}?tipoP=${tipo}`, {
      headers: this.getHeaders(),
      responseType: 'blob',
      observe: 'response'
    });
  }

  buscarPautaPorDisciplinaNome(disciplina: string): Observable<PautaEstudante[]> {
    const nomeCodificado = encodeURIComponent(disciplina.trim());
    const url = `${this.baseUrl}/staff/buscarpauta/${nomeCodificado}`;
    return this.http.get<PautaEstudante[]>(url, { headers: this.getHeaders() });
  }

  buscarPautaPorDisciplinaId(disciplinaId: number): Observable<PautaEstudante[]> {
    const url = `${this.baseUrl}/staff/minhapauta/${disciplinaId}`;
    return this.http.get<PautaEstudante[]>(url, { headers: this.getHeaders() });
  }

  atualizarNotas(id: number, payload: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/departamento/studentsubject/${id}`, payload, {
      headers: this.getHeaders()
    });
  }

  getPedidosPendentes(disciplinaId: number): Observable<PedidoEdicaoNota[]> {
    return this.http.get<PedidoEdicaoNota[]>(
      `${this.baseUrl}/departamento/StudentSubjectEdit/${disciplinaId}`,
      { headers: this.getHeaders() }
    );
  }

  getPedidosAprovados(disciplinaId: number): Observable<PedidoEdicaoNota[]> {
    return this.http.get<PedidoEdicaoNota[]>(
      `${this.baseUrl}/departamento/StudentSubjectEdit/aprovadas/${disciplinaId}`,
      { headers: this.getHeaders() }
    );
  }

  getPedidosRejeitados(disciplinaId: number): Observable<PedidoEdicaoNota[]> {
    return this.http.get<PedidoEdicaoNota[]>(
      `${this.baseUrl}/departamento/StudentSubjectEdit/rejeitadas/${disciplinaId}`,
      { headers: this.getHeaders() }
    );
  }
}
