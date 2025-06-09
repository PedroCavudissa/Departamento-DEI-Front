import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Nota {
  matricula: string;
  ac: number;
  pf: number;
  notaFinal: number;
}



@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private apiUrl = 'https://dd3f-102-218-85-31.ngrok-free.app/api/estudanteDisciplina/pauta/disciplinaId';

  constructor(private http: HttpClient) {}

  gerarExcel(disciplinaId: number): Observable<Blob> {
    const url = `${this.apiUrl}/${disciplinaId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  listarDisciplinas(): Observable<{ id: number; nome: string }[]> {
    return this.http.get<{ id: number; nome: string }[]>('/api/disciplinas');
  }

  importarExcel(disciplinaId: number, tipo: number, file: File): Observable<Nota[]> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.apiUrl}/${disciplinaId}/importar/${tipo}`;
    return this.http.post<Nota[]>(url, formData);
  }

  salvarNotas(disciplinaId: number, notas: Nota[], tipo: number): Observable<void> {
    const url = `${this.apiUrl}/${disciplinaId}/salvar/${tipo}`;
    return this.http.post<void>(url, notas);
  }

  publicarNotas(disciplinaId: number, notas: Nota[], tipo: number): Observable<void> {
    const url = `${this.apiUrl}/${disciplinaId}/publicar/${tipo}`;
    return this.http.post<void>(url, notas);
  }
}
