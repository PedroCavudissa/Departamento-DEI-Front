import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../enviroments/environment';


export interface Evento {
  id?: number;
  data: string;
  titulo: string;
  tipo: string;
  link?: string;
  hora?: string;
  calendarStatus?: string;
  nomeFuncionario?: string;
  updatedAt?: string;
  deletedAt?: string;
  conteudo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private baseUrl = `${environment.apiUrl}/api/calendars`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  }

  /** 🔄 Listar todos os eventos */
  listarEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Erro ao listar eventos:', err);
        return of([]);
      })
    );
  }

  /** 📥 Criar um novo evento */
  salvarEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseUrl, evento, { headers: this.getAuthHeaders() });
  }

  /** 🔍 Buscar evento por ID */
  obterEventos(id: number): Observable<Evento[]> {
    return this.http.get<Evento>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error(`Erro ao buscar evento ID ${id}:`, err);
        return of(null as any);
      })
    );
  }

  /** 🗑 Remover evento por ID */
  removerEvento(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error(`Erro ao remover evento ID ${id}:`, err);
        return of(null);
      })
    );
  }

  /** ✏️ Atualizar evento por ID */
  atualizarEvento(id: number, dadosAtualizados: Partial<Evento>): Observable<Evento> {
    return this.http.patch<Evento>(`${this.baseUrl}/${id}`, dadosAtualizados, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error(`Erro ao atualizar evento ID ${id}:`, err);
        return of(null as any);
      })
    );
  }
}
