import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  sigla: string;
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
export interface Confirmacao {
  id: number;
  anoLetivo: number;
  semestre: number;
  estado: 'PAGO' | 'NÃO_PAGO'; 
  estudanteId: number;
  nomeEstudante: string;
  active?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmacaoService {
  private baseUrl = `${environment.apiUrl}/api`;

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

 finalizarConfirmacao(estudanteId: number, disciplinasIds: number[]): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/departamento/students/confirmar/${estudanteId}`,
    disciplinasIds, // deve ser tipo: number[]
    this.getHeaders()
  );
}

atualizarEstado(id: number, dados: Partial<Confirmacao>): Observable<any> {
  return this.http.put(`${this.baseUrl}/payments/confirmacoes/${id}`, dados, this.getHeaders());
}
  getConfirmacoesPendentes(): Observable<Confirmacao[]> {
    return this.http.get<Confirmacao[]>(`${this.baseUrl}/payments/confirmacoes/pendentes`, this.getHeaders());
  }
}
