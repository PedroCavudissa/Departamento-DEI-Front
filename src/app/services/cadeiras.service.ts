import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DisciplinaEmAtraso {
  sigla: string;
  nome: string;
  ano_academico: number | string;
  semestre: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CadeirasService {
  constructor(private http: HttpClient) {}

  getDisciplinasEmAtraso(): Observable<DisciplinaEmAtraso[]> {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<DisciplinaEmAtraso[]>(
      `${environment.apiUrl}/list/disciplinasemetraso`,
      { headers }
    );
  }
}
