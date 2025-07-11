
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evento {
  data: string;
  titulo: string;
  tipo: string;
  link?: string;
  hora?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private apiUrl = '/api/calendary'; 

  constructor(private http: HttpClient) {}

  salvarEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.apiUrl}/save`, evento);
  }

  /** 🔄 Obter todos os eventos do backend */
  obterEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/all`);
  }
listarEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  
}
}