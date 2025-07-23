import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

export interface Confirmacao {
  id: number;
  nomeEstudante: string;
  estudanteId: number | string; // depende do backend, pode ajustar
  anoLetivo: string;
  semestre: number;
  estado: 'PAGO' | 'NÃO_PAGO'; // se quiser mais preciso, ou apenas: string
}

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
   disciplinaId: number;
   nome: string;
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

  getDisciplinasFazer(): Observable<Disciplina[]> {
  return this.http.get<Disciplina[]>(
    `${this.baseUrl}/departamento/students/disciplinas`,
    this.getHeaders()
  );
}

  getDisciplinasAtrasadas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/departamento/students/list/disciplinasemetraso`, this.getHeaders());
  }

  getRupeDoEstudante(): Observable<Rupe[]> {
    return this.http.get<Rupe[]>(`${this.baseUrl}/payments/rupe/myRupes`, this.getHeaders());
  }

finalizarConfirmacao(disciplinasIds: number[]): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/departamento/students/confirmar`,
    disciplinasIds,
    this.getHeaders()
  );
}

getDisciplinasInscritas(): Observable<Disciplina[]> {
  return this.http.get<Disciplina[]>(
    `${this.baseUrl}/departamento/studentsubject/disciplinas-inscritas`,
    this.getHeaders()
  );
}



listarConfirmacoes(): Observable<{ content: Confirmacao[] }> {
  return this.http.get<{ content: Confirmacao[] }>(
    `${this.baseUrl}/departamento/confirmacoes`,
    this.getHeaders()
  );
}

atualizarEstado(id: number, confirmacaoAtualizada: Confirmacao): Observable<any> {
  return this.http.put(
    `${this.baseUrl}/departamento/confirmacoes/${id}`,
    confirmacaoAtualizada,
    this.getHeaders()
  );
}
}