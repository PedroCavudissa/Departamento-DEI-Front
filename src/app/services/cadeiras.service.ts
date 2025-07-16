import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

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
    return this.http.get<DisciplinaEmAtraso[]>(`${environment.apiUrl}/list/disciplinasemetraso`);
  }
}
