import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProfessorDisciplina {
  id: number;
  funcionarioId?: number;
  funcionarioNome: string;
  disciplinaNome: string;
  disciplinaId: number;
}

export interface Disciplina {
  id?: number;
  sigla: string;
  nome: string;
  anoAcademico: string;
  semestre: string;
}

export interface Horario {
  id?: number;
  ano: number;
  semestre: number;
  horarios: any[][];
}

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}


  private getHeaders(): { headers: HttpHeaders } {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;
  
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      })
    };
  }
  getProfessores(): Observable<ProfessorDisciplina[]> {
    return this.http.get<ProfessorDisciplina[]>(`${this.baseUrl}/api/departamento/staffsubject`, this.getHeaders());
  }
  
  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.baseUrl}/api/subject/list`, this.getHeaders());
  }
  
  salvarHorario(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(`${this.baseUrl}/horarios`, horario, this.getHeaders());
  }
  
  listarHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}/horarios`, this.getHeaders());
  }
  
  baixarHorarioPdf(idHorario: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/horarios/${idHorario}/pdf`, {
      ...this.getHeaders(),
      responseType: 'blob' 
    });
  }
  
}
