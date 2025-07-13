import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

export interface Estudante {
  nome: string;
  dataNascimento: string; 
  numIdentificacao: string;
  tipoDocumento: string;
  endereco: string;
  contacto: string;
  anoAcademico: number;
  dataIngresso: string;
  email: string;
  instituicaoAnterior: string;
  notaExameAcesso: number;
  notaEnsinoMedio: number;
  regimeIngresso: string;
  dataConclusao:  string;
  statusEstudante: string;
}

@Injectable({ providedIn: 'root' })
export class EstudanteService {
  private apiUrl = `${environment.apiUrl}/api/departamento/students`;

  constructor(private http: HttpClient) {}

  cadastrar(estudante: Estudante): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token JWT comparar:', localStorage.getItem('token'));
    console.log('Estudante a ser cadastrado:', estudante);


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer${token}`,
      'Accept': 'application/json'

    });

    return this.http.post(this.apiUrl, estudante, { headers });
  }
 
  getTotalEstudantes(): Observable<number> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  
    const url = `${environment.apiUrl}/api/departamento/students/total`;
  
    return this.http.get<number>(url, { headers }).pipe(
      map(res => {
        console.log('✅ Resposta da API (getTotalEstudantes):', res);
        return res ?? 0;
      })
    );
  }
  
  

}
