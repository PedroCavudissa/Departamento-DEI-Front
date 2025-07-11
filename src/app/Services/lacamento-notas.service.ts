import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private baseUrl = 'https://922bf80d48fa.ngrok-free.app/api';

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

enviarExcel(file: File, disciplinaId: number, tipo: number): Observable<any> {
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
}
