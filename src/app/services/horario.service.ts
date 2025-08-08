import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface HorarioItem {
  turmaSigla: string;
  disciplinaSigla: string;
  diaSemana: string;
  horaInicio: string;
  horaFim: string;
  horarioFormatado: string;
  anoLetivo: number;
  semestre: number;
  createdAt: string;
  updatedAt: string;
}
export interface CreateHorarioDto {
  turmaSigla: string;
  disciplinaSigla: string;
  diaSemana: string;
  horaInicio: string;
  horaFim: string;
  anoLetivo: number;
  semestre: number;
}

export interface Turma {
  sigla: string;
  semestre: number;
  anoLetivo: number;
}

@Injectable({ providedIn: 'root' })
export class HorarioService {
  private baseUrl = 'https://10bd580d93e8.ngrok-free.app';

  constructor(private http: HttpClient) {}

  /** Monta headers com token salvo no localStorage */
  private getAuthHeaders(): HttpHeaders {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  }

  /** Busca grade horária filtrando por ano, semestre e turma */
  getGradeHoraria(): Observable<HorarioItem[]> {
    return this.http.get<HorarioItem[]>(
      `${this.baseUrl}/schedules`,
      { headers: this.getAuthHeaders() }
    );
  }
  /** Busca lista de turmas */
  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(
      `${this.baseUrl}/turmas`,
      { headers: this.getAuthHeaders() }
    );
  }

  cadastrarHorario(horario: CreateHorarioDto): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/schedules`,
      horario,
      { headers: this.getAuthHeaders() }
    );
  }
  
  
  
}
