import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../enviroments/environment';

export interface TotaisResumo {
  estudantes: number;
  funcionarios: number;
  cadeiras: number;
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }

  private parseResponseToNumber(res: string, label: string): number {
    const cleaned = res.replace(/[^\d]/g, ''); // Remove tudo que não for número
    const num = Number(cleaned);
    console.log(`✅ ${label}: '${res}' → ${num}`);
    return isNaN(num) ? 0 : num;
  }

  getTotais(): Observable<TotaisResumo> {
    const headers = this.getHeaders();

    const estudantes$ = this.http.get(`${this.baseUrl}/api/departamento/students/total`, {
      headers,
      responseType: 'text'
    }).pipe(map(res => this.parseResponseToNumber(res, 'Estudantes')));

    const funcionarios$ = this.http.get(`${this.baseUrl}/api/staff/count`, {
      headers,
      responseType: 'text'
    }).pipe(map(res => this.parseResponseToNumber(res, 'Funcionários')));

    const cadeiras$ = this.http.get(`${this.baseUrl}/api/subject/total`, {
      headers,
      responseType: 'text'
    }).pipe(map(res => this.parseResponseToNumber(res, 'Cadeiras')));

    return forkJoin({
      estudantes: estudantes$,
      funcionarios: funcionarios$,
      cadeiras: cadeiras$
    });
  }
}
