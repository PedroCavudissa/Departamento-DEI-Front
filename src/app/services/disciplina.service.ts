// disciplina.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Disciplina {
  id?: number;
  sigla: string;
  nome: string;
  anoAcademico: string;
  semestre: string;
  precedenciasDisciplinaNome: string[];
}


@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  constructor(private http: HttpClient) {}

  getDisciplinas(): Observable<Disciplina[]> {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  
    const url = `${environment.apiUrl}/api/subject/list?page=0&size=100`;
    return this.http.get<any>(url, { headers }).pipe(
      map((res) => Array.isArray(res) ? res : res.content || []),
      catchError((err) => {
        console.error('Erro ao buscar disciplinas:', err);
        return of([]);
      })
    );
  }
  
  createDisciplina(disciplina: any) {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  
    return this.http.post(`${environment.apiUrl}/api/subject/disciplinas`, disciplina, { headers });
  }
  
  updateDisciplina(id: number, disciplina: any) {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  
    return this.http.put(`${environment.apiUrl}/api/subject/disciplinas/${id}`, disciplina, { headers });
  }
}
