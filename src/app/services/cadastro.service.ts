import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generate, map, Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

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
      'Authorization': `Bearer${token}`,
      'Accept': 'application/json'

    });
      return this.http.post(url, funcionario, { headers });
    }


    getTotalFuncionario(){
      const token=localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      });
    
      const url = 'https://7fa0-102-218-85-74.ngrok-free.app/api/staff/count';
    
      return this.http.get<number>(url, { headers }).pipe(
        map(res => {
          console.log(' Resposta da API (getTotalFuncionáios):', res);
          return res ?? 0;
        })
      );
     }
  }
