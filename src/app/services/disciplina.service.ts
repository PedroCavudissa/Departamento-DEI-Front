// disciplina.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Disciplina {
  id: number;
  sigla: string;
  nome: string;
  anoAcademico: string;
  precedencia: string;
  semestre: string;
}

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  constructor(private http: HttpClient) {}

  getDisciplinas(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  
    const url = `${environment.apiUrl}/api/subject/list?page=0&size=1000`; 
    return this.http.get<any>(url, { headers }).pipe(
      map((res: any) => res.content || []) 
    );
  }
  
  
}
