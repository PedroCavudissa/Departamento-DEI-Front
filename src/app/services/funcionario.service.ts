import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { } // ✅ Injeção CORRETA (com 'private')

  getTotalFuncionarios(): Observable<number> {
    const url = "https://7fa0-102-218-85-74..."; // Substitua pela URL real
    const headers = new HttpHeaders({ 
      // Adicione headers se necessário
      // Exemplo: 'Authorization': 'Bearer token'
    });

    return this.http.get<number>(url, { headers }).pipe(
      map(res => res ?? 0) // Caso res seja null/undefined, retorna 0
    );
  }
}
