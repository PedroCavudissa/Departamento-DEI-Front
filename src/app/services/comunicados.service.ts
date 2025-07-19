import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Comunicado, NovoComunicado } from '../models/comunicados.model';

@Injectable({
  providedIn: 'root',
})
export class ComunicadosService {
  public readonly API_URL =
    'https://9c257c8cf488.ngrok-free.app/api/departamento/notices';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient) {}

  listar(): Observable<Comunicado[]> {
    return this.http
      .get<Comunicado[]>(`${this.API_URL}/list`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

// comunicados.service.ts

// comunicados.service.ts
filtrarPorDestinatario(destino: string): Observable<Comunicado[]> {
  const destinosValidos = ['PROFESSOR', 'ESTUDANTE', 'SECRETARIA', 'ADMINISTRADOR', 'TODOS'];

  if (!destinosValidos.includes(destino)) {
    return throwError(() => new Error('Destinatário inválido'));
  }

  // Correção: destino é parte da URL, não query string
  const url = `${this.API_URL}/destinado/${encodeURIComponent(destino)}`;

  return this.http.get<Comunicado[]>(url, this.httpOptions).pipe(
    catchError(error => {
      console.error('Erro na filtragem:', error);
      return throwError(() => new Error(
        error.status === 404
          ? 'Nenhum comunicado encontrado para este filtro'
          : 'Erro ao filtrar comunicados'
      ));
    })
  );
}


  criar(comunicado: NovoComunicado): Observable<Comunicado> {
    return this.http
      .post<Comunicado>(`${this.API_URL}/create`, comunicado, this.httpOptions)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return this.http.post<Comunicado>(
              `${this.API_URL}/createNotice`,
              comunicado,
              this.httpOptions
            );
          }
          return throwError(() => error);
        })
      );
  }

  atualizar(id: number, comunicado: Comunicado): Observable<Comunicado> {
    const payload = {
      titulo: this.validarCampo(comunicado.titulo),
      conteudo: this.validarCampo(comunicado.conteudo),
      noticeStatus: comunicado.noticeStatus || 'VALIDO',
      destinado: comunicado.destinado || 'PROFESSOR',
      dataAcontecimento: this.formatarData(comunicado.dataAcontecimento),
    };

    console.log('Enviando PATCH para ID:', id);
    console.log('Payload:', payload);

    return this.http.patch<Comunicado>(
      `${this.API_URL}/update/${id}`,
      payload,
      this.httpOptions
    );
  }

  private validarCampo(valor: string): string {
    return (valor || '').toString().trim();
  }

  private formatarData(data: string): string {
    try {
      return data
        ? new Date(data).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  }

  private prepararPayloadAtualizacao(comunicado: Comunicado): unknown {
    return {
      titulo: comunicado.titulo?.trim() || '',
      conteudo: comunicado.conteudo?.trim() || '',
      noticeStatus: comunicado.noticeStatus || 'VALIDO',
      destinado: comunicado.destinado || 'PROFESSOR',
      dataAcontecimento: this.formatarData(comunicado.dataAcontecimento),
    };
  }

  private formatData(data: string): string {
    if (!data) return new Date().toISOString().split('T')[0];
    return data.includes('T') ? data.split('T')[0] : data;
  }

  private filtrarDadosAtualizacao(comunicado: Comunicado): unknown {
    return {
      titulo: comunicado.titulo,
      conteudo: comunicado.conteudo,
      noticeStatus: comunicado.noticeStatus,
      destinado: comunicado.destinado,
      dataAcontecimento: comunicado.dataAcontecimento,
    };
  }

  private prepararDadosAtualizacao(comunicado: Comunicado): unknown {
    return {
      titulo: comunicado.titulo,
      conteudo: comunicado.conteudo,
      noticeStatus: comunicado.noticeStatus,
      destinado: comunicado.destinado,
      dataAcontecimento: comunicado.dataAcontecimento,
    };
  }

  remover(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.API_URL}/delete/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  debugRequest(
    url: string,
    method: string,
    body?: unknown
  ): Observable<unknown> {
    console.log('Debug request:', { url, method, body });

    const options = {
      ...this.httpOptions,
      observe: 'response' as const,
    };

    switch (method.toUpperCase()) {
      case 'GET':
        return this.http.get(url, options);
      case 'POST':
        return this.http.post(url, body, options);
      case 'PUT':
        return this.http.put(url, body, options);
      case 'PATCH':
        return this.http.patch(url, body, options);
      case 'DELETE':
        return this.http.delete(url, options);
      default:
        return throwError(() => new Error(`Método ${method} não suportado`));
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
