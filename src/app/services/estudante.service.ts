
// estudante.service.ts
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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
   userDetails?: any; 
}

@Injectable({ providedIn: 'root' })
export class EstudanteService {
  private apiUrl = 'https://7fa0-102-218-85-74.ngrok-free.app/api/departamento/students';

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
  
    const url = 'https://7fa0-102-218-85-74.ngrok-free.app/api/departamento/students/total';
  
    return this.http.get<number>(url, { headers }).pipe(
      map(res => {
        console.log('✅ Resposta da API (getTotalEstudantes):', res);
        return res ?? 0;
      })
    );
  }
  
  


}
