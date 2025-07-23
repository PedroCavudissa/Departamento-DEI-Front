import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../enviroments/environment';

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
  funcionarioNome: string;
  disciplinaNome: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  pageable: any;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface TipoPauta {
  codigo: number;
  descricao: string;
}


@Injectable({
  providedIn: 'root'
})
export class LacamentoNotasService {
  private baseUrl = ` ${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || '';
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      })
    };
  }

 getDadosDoProfessor(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/me`, this.getHeaders());
  }

  getDisciplinasDoProfessor(): Observable<Disciplina[]> {
    return this.http.get<PaginatedResponse<Disciplina>>(
      `${this.baseUrl}/departamento/staffsubject`,
      this.getHeaders()
    ).pipe(
      map(resposta => resposta.content)
    );
  }

importarExcel(file: File, disciplinaId: number, tipo: number): Observable<any> {
  const formData = new FormData();
  formData.append('file', file); // nome está certo: 'file'

  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Accept': 'application/json',
  });

  const url = `${this.baseUrl}/departamento/studentsubject/upload?disciplinaId=${disciplinaId}&tipoP=${tipo}`;

 return this.http.post(url, formData, {
  headers,
  responseType: 'text' as 'json' // <- tipo `text`, mas compatível com o Angular
});

}
  baixarModeloExcel(disciplinaId: number, tipo: number): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/departamento/studentsubject/pauta/${disciplinaId}?tipoP=${tipo}`, {
      headers: this.getHeaders().headers,
      responseType: 'blob',
      observe: 'response'
    });
  }
buscarPautaPorDisciplinaNome(disciplina: string): Observable<PautaEstudante[]> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'ngrok-skip-browser-warning': 'true'
  });

  const nomeCodificado = encodeURIComponent(disciplina.trim());
  const url = `${this.baseUrl}/staff/buscarpauta/${nomeCodificado}`;

  return this.http.get<PautaEstudante[]>(url, { headers });
}

atualizarNotas(id: number, payload: any): Observable<any> {
  const headers = this.getHeaders().headers;
  return this.http.patch(`${this.baseUrl}/departamento/studentsubject/${id}`, payload, { headers });
}

/////////////////////////////////////////////////////////////////////

getPedidosPendentes(disciplinaId: number): Observable<PedidoEdicaoNota[]> {
  return this.http.get<PedidoEdicaoNota[]>(
    `${this.baseUrl}/departamento/StudentSubjectEdit/${disciplinaId}`,
    this.getHeaders()
  );
}

getPedidosAprovados(disciplinaId: number): Observable<PedidoEdicaoNota[]> {
  return this.http.get<PedidoEdicaoNota[]>(
    `${this.baseUrl}/departamento/StudentSubjectEdit/aprovadas/${disciplinaId}`,
    this.getHeaders()
  );
}

getPedidosRejeitados(disciplinaId: number): Observable<PedidoEdicaoNota[]> {
  return this.http.get<PedidoEdicaoNota[]>(
    `${this.baseUrl}/departamento/StudentSubjectEdit/rejeitadas/${disciplinaId}`,
    this.getHeaders()
  );
}
}

  salvarNotas(disciplinaId: number, tipo: number, notas: any[]): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  
    const url = `${this.baseUrl}/departamento/studentsubject/salvar?disciplinaId=${disciplinaId}&tipoP=${tipo}`;
  
    return this.http.post(url, notas, { headers });
  }
  
}

