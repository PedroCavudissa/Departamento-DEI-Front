import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generate, Observable } from 'rxjs';

export interface Funcionario {
  nome: string;
  dataNascimento: string;
  numDocumento: string;
  tipoDocumento: string;
  endereco: string;
  nivelAcademico: string;
  cargo: string;
  email: string;
  dataIngresso: string;
}

@Injectable({ providedIn: 'root' })

  export class FuncionarioService {
    private baseUrl = 'https://d9dd79742edf.ngrok-free.app/api/auth/register/staff';
  
    constructor(private http: HttpClient) {}
  
    cadastrar(funcionario: Funcionario): Observable<any> {
      const url = `${this.baseUrl}/${funcionario.numDocumento}?nunumIdentificacao=1`;
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post(url, funcionario, { headers });
    }
  }
