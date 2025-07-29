import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Comunicado, NovoComunicado } from '../models/comunicados.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComunicadosService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  private readonly API_URL = `${environment.apiUrl}/api/departamento/notices`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Comunicado[]> {
    return this.http
      .get<Comunicado[]>(`${this.API_URL}/list`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  filtrarPorDestinatario(destino: string): Observable<Comunicado[]> {
    const destinosValidos = ['PROFESSOR', 'ESTUDANTE', 'SECRETARIA', 'ADMINISTRADOR', 'TODOS'];
    const destinoFormatado = destino.toUpperCase().trim();

    if (!destinosValidos.includes(destinoFormatado)) {
      return throwError(() =>
        new Error(`Destinatário inválido. Use um dos seguintes: ${destinosValidos.join(', ')}`)
      );
    }

    const url = `${this.API_URL}/destinado/${encodeURIComponent(destinoFormatado)}`;

    return this.http.get<Comunicado[]>(url, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Erro na filtragem:', error);
        return throwError(() =>
          new Error(
            error.status === 404
              ? 'Nenhum comunicado encontrado para este destinatário'
              : 'Erro ao filtrar comunicados. Por favor, tente novamente.'
          )
        );
      })
    );
  }

  criar(comunicado: NovoComunicado): Observable<Comunicado> {
    return this.http
      .post<Comunicado>(`${this.API_URL}/create`, comunicado, this.httpOptions)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return this.http.post<Comunicado>(`${this.API_URL}/createNotice`, comunicado, this.httpOptions);
          }
          return throwError(() => error);
        })
      );
  }

  atualizar(id: number, comunicado: Comunicado): Observable<Comunicado> {
    const payload = this.prepararPayloadAtualizacao(comunicado);

    console.log('Enviando PATCH para ID:', id);
    console.log('Payload:', payload);

    return this.http.patch<Comunicado>(`${this.API_URL}/update/${id}`, payload, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  remover(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.API_URL}/delete/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private prepararPayloadAtualizacao(comunicado: Comunicado): unknown {
    return {
      titulo: (comunicado.titulo || '').trim(),
      conteudo: (comunicado.conteudo || '').trim(),
      noticeStatus: comunicado.noticeStatus || 'VALIDO',
      destinado: comunicado.destinado || 'PROFESSOR',
      dataAcontecimento: this.formatarData(comunicado.dataAcontecimento),
    };
  }

  private formatarData(data: string): string {
    try {
      return data ? new Date(data).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro na requisição:', error);
    let errorMessage = 'Ocorreu um erro';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código: ${error.status}\nMensagem: ${error.message}`;
      if (error.status === 401) {
        errorMessage = 'Não autorizado - faça login novamente';
      } else if (error.status === 404) {
        errorMessage = 'Endpoint não encontrado - verifique a URL';
      } else if (error.status === 405) {
        errorMessage = 'Método não permitido - verifique o verbo HTTP';
      } else if (error.error && error.error.message) {
        errorMessage += `\nDetalhes: ${error.error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
