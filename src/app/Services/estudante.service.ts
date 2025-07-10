import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  dataConclusao: string;
  statusEstudante: string;
}
  
  @Injectable({ providedIn: 'root' })
  export class EstudanteService {
    private apiUrl = 'https://cef3-102-214-36-154.ngrok-free.app/api/departamento/students';
  
    constructor(private http: HttpClient) {}
  
    cadastrar(estudante: any) {
      const token = localStorage.getItem('token');
     
console.log('Token usado:', token); 
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.post(this.apiUrl, estudante, { headers });
    }
  
  }
  

