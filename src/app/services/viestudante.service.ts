import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

// Defina interfaces mais flexíveis
interface UserDetails {
  id: number;
  dataNascimento: string;
  numIdentificacao: string;
  tipoDocumento: string;
  endereco: string;
  contacto: string;
  anoAcademico: number;
  dataIngresso: string;
  dataConclusao: string;
  statusEstudante: string;
  instituicaoAnterior: string,
  notaExameAcesso: number,
  notaEnsinoMedio: number,
  regimeIngresso: string,
  [key: string]: any; // Permite propriedades adicionais
}

export interface Viestudante {
  nome?: string;
  userDetails: UserDetails;
  [key: string]: any; // Permite propriedades adicionais
}
@Injectable({
  providedIn: 'root'
})
export class ViestudanteService {

  cadastrar(viestudante: Viestudante) {
    throw new Error('Method not implemented.');
  }
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

  getEstudante(): Observable<Viestudante> {
    return this.http.get<Viestudante>(`${this.baseUrl}/auth/me`, this.getHeaders());
  }


atualizarPerfil(id: number, dadosAtualizados: Partial<Viestudante>): Observable<Viestudante> {
  return this.http.patch<Viestudante>(`${this.baseUrl}/departamento/students/${id}`, dadosAtualizados, 
    this.getHeaders()
  );
}
  
}

