import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../enviroments/environment';


export interface Disciplina {
  id: number;
  sigla: string;
  nome: string;
  ano_academico: string;
  precedencia: string;
  semestre: string;
}

export interface DisciplinaEmAtraso {
  id: number;
  sigla: string;
  nome: string;
  precedencia: number;
  semestre: string;
  ano_academico: string;
  ano:number
}


@Injectable({
  providedIn: 'root'

})



export class DisciplinaService {

  private baseUrl = `${environment.apiUrl}/api/subject/atrasadas`;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
 
  }

getTotalCadeiras(): Observable<number> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  });

  const url = `${environment.apiUrl}/api/subject/total`;

  return this.http.get(url, { headers, responseType: 'text' }).pipe(
    map(res => {
      const num = Number(res);
      return isNaN(num) ? 0 : num;
    })
  );
  
}  
getDisciplinas(): Observable<any[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  const url = `${environment.apiUrl}/api/subject/list`;
  return this.http.get<any[]>(url, { headers });
}


}