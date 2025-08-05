import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface DisciplinaEmAtraso {
  id: number;
  nome: string;
  sigla: string;
  ano_academico: string;
  precedencia: string;
  semestre: string;
  detalhes: string;
}


@Injectable({
  providedIn: 'root'
})
export class CadeirasService {
 private baseUrl = `${environment.apiUrl}/api/departamento/students/list/disciplinasemetraso`;

  constructor(private http: HttpClient) {}

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
  

  /**
   * Retorna as disciplinas em atraso para o estudante logado.
   */
  

  getDisciplinasEmAtraso(): Observable<string | DisciplinaEmAtraso[]> {
    return this.http.get<DisciplinaEmAtraso[] | string>(this.baseUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((res) => {
        console.log('Resposta do backend:', res);
        return res;
      })
    );
  }
  
}