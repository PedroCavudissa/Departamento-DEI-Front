import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserDetails {
  id: number;
  nome: string;
  dataNascimento: string;
  numIdentificacao: string;
  tipoDocumento: string;
  endereco: string;
  contacto: string;
  anoAcademico: number;
  dataIngresso: string;
  dataConclusao: string;
  statusEstudante: string;
}

export interface DadosAcademicos {
  id: number;
  email: string;
  role: string;
  nome: string;
  createdAt: string;
  userType: string;
  userDetails: UserDetails;
}

export interface Disciplina {
  id: number;
  sigla: string; // antes: codigo
  nome: string;
  anoAcademico: number;
  semestre: number;
  precedenciasDisciplinaNome: string[];
}

export interface Rupe {
  rupeNumber: string;
  studentName: string;
  studentNumber: string;
  amount: number;
  emissionDate: string;
  expirationDate: string;
  status: string;
  paymentReasons: string[];
}

@Injectable({ providedIn: 'root' })
export class ConfirmacaoService {
  private baseUrl = 'https://d9dd79742edf.ngrok-free.app/api';

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

  getDadosAcademicos(): Observable<DadosAcademicos> {
    return this.http.get<DadosAcademicos>(`${this.baseUrl}/auth/me`, this.getHeaders());
  }

  getDisciplinasFazer(estudanteId: number, ano: number, semestre: number): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(
      `${this.baseUrl}/subject/disciplinas/disponiveis/${estudanteId}?ano=${ano}&semestre=${semestre}`,
      this.getHeaders()
    );
  }

  getDisciplinasAtrasadas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/departamento/students/list/disciplinasemetraso`, this.getHeaders());
  }

  getRupeDoEstudante(): Observable<Rupe[]> {
    return this.http.get<Rupe[]>(`${this.baseUrl}/payments/rupe/myRupes`, this.getHeaders());
  }

  finalizarConfirmacao(payload: { estado: string, estudanteId: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/departamento/confirmation`, payload, this.getHeaders());
  }
}
