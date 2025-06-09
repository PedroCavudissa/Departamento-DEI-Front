import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Nota {
    matricula: string;
    aluno: string;
    ac?: number;         
    pf?: number;
    notaFinal: number;
  }
  

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private baseUrl = 'http://localhost:3000/api/notas'; // Ajuste se necessário

  constructor(private http: HttpClient) {}

  gerarExcel(tipo: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/excel/${tipo}`, { responseType: 'blob' });
  }


  importarExcel(tipo: number, file: File): Observable<Nota[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Nota[]>(`${this.baseUrl}/importar/${tipo}`, formData);
  }

  salvarNotas(notas: Nota[], tipo: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/salvar/${tipo}`, notas);
  }

  publicarNotas(notas: Nota[], tipo: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/publicar/${tipo}`, notas);
  }
}
