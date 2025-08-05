import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Evento {
  id?: number;
  data: string;
  titulo: string;
  conteudo: string;
  calendarStatus: string;
  nomeFuncionario?: string;
  createdAt?: string;
}

export interface CalendarioProva {
  disciplinaSigla: string;
  dataProva: string;
  horaInicio: string;
  horaFim: string;
  anoLetivo: number;
  semestre: number;
  anoAcademico: number;
  tipoProva: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const usuario = localStorage.getItem('usuario');
    const token = usuario ? JSON.parse(usuario).token : null;
  
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });
  }

  obterEventos(): Observable<Evento[]> {
    return this.http.get<{ content: Evento[] }>(`${this.baseUrl}/calendars`, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      map(response => response.content),
      catchError(error => {
        console.error('Erro ao obter eventos:', error);
        return throwError(() => new Error('Erro ao carregar eventos'));
      })
    );
  }

  salvarEvento(evento: Evento): Observable<Evento> {
    const { ...eventoSemId } = evento;
    return this.http.post<Evento>(`${this.baseUrl}/calendars`, eventoSemId, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('Erro ao salvar evento:', error);
        return throwError(() => new Error('Erro ao salvar evento'));
      })
    );
  }

  obterCalendarioPorId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/calendars/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  listarEventos(): Observable<{ content: Evento[] }> {
    return this.http.get<{ content: Evento[] }>(`${this.baseUrl}/calendars`, { 
      headers: this.getAuthHeaders() 
    });
  }

  obterCalendarioDoUsuario(): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/calendars/1`, {
      headers: this.getAuthHeaders(),
      responseType: 'json'
    });
  }

  criarCalendarioProva(prova: CalendarioProva): Observable<CalendarioProva> {
    return this.http.post<CalendarioProva>(`${this.baseUrl}/calendario-prova`, prova, { 
      headers: this.getAuthHeaders() 
    });
  }

  listarProvas(): Observable<{ content: CalendarioProva[] }> {
    return this.http.get<{ content: CalendarioProva[] }>(`${this.baseUrl}/calendario-prova`, { 
      headers: this.getAuthHeaders() 
    });
  }

  baixarPDFCalendarioProvas() {
    const headers = this.getAuthHeaders();
    
    fetch(`${this.baseUrl}/pdf/calendario-provas`, {
      headers: {
        'Authorization': headers.get('Authorization') || '',
        'ngrok-skip-browser-warning': 'true'
      }
    })
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'calendario-provas.pdf';
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Erro ao baixar PDF:', error);
    });
  }
}