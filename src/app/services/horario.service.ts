import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private baseUrl = `${environment.apiUrl}`; // URL base da API, definida no environment.ts

  constructor(private http: HttpClient) {}

  /** Monta headers com token salvo no localStorage */
  private getAuthHeaders(): HttpHeaders {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;
    console.log('Token usado no header:', token);
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
