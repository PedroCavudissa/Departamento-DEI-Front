import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, generate, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Funcionario {
  nome: string;
  dataNascimento: Date;
  numDocumento: string;
  tipoDocumento: string;
  endereco: string;
  nivelAcademico: string;
  cargo: string;
  email: string;
  dataIngresso: Date;
}


@Injectable({ providedIn: 'root' })

  export class FuncionarioService {
    private baseUrl = `${environment.apiUrl}/api/staff`;
  
    constructor(private http: HttpClient) {}
  
    cadastrar(funcionario: Funcionario): Observable<any> {
      const url = `${this.baseUrl}`;
      const token=localStorage.getItem("token");
    const headers = new HttpHeaders({
     
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'

    });
      return this.http.post(url, funcionario, { headers });
    }
    getFuncionarios(): Observable<Funcionario[]> {
      const token = localStorage.getItem('token') || '';
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      });
    
      const url = `${environment.apiUrl}/api/staff`;
    
      return this.http.get<any>(url, { headers }).pipe(
        map(res => res.content || []), 
        catchError(err => {
          console.error('Erro ao buscar funcionários:', err);
          return of([]);
        })
      );
      
    }
    
}
  
  