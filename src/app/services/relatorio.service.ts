import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //  Gera os headers para cada requisição
  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || '';
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      })
    };
  }

  //  Total de funcionários
  getTotalFuncionarios(): Observable<number> {
    const url = `${this.api}/api/departamento/reports/staff/total`;
    return this.getTotal(url);
  }

  // ✅ Total de cadeiras
  getTotalCadeiras(): Observable<number> {
    const url = `${this.api}/api/departamento/reports/subjects/total`;
    return this.getTotal(url);
  }

  //  Total de estudantes
  getTotalEstudantes(): Observable<number> {
    const url = `${this.api}/api/departamento/reports/students/total`;
    return this.getTotal(url);
  }

  // ✅ Total de estudantes por ano
  getTotalEstudantesPorAno(ano: number): Observable<number> {
    const url = `${this.api}/api/student/total-by-year/${ano}`;
    return this.getTotal(url);
  }

  private getTotal(url: string): Observable<number> {
    return this.http.get<any>(url, this.getHeaders()).pipe(
      map((res: any) => {
        const total = Number(res?.total ?? res);
        if (isNaN(total)) {
          console.warn(' Resposta inválida:', res);
          return 0;
        }
        return total;
      }),
      catchError(err => {
        console.error(` Erro ao buscar total (${url}):`, err);
        return of(0);
      })
    );
  }
}
