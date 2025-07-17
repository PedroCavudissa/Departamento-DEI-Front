import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Comunicado, NovoComunicado } from '../models/comunicados.model';
import { environment } from '../../enviroments/environment';

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

  constructor(private http: HttpClient) {}

  listar(): Observable<Comunicado[]> {
    return this.http
      .get<Comunicado[]>(`${environment.apiUrl}/api/departamento/notices/list`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  criar(comunicado: NovoComunicado): Observable<Comunicado> {
    return this.http
      .post<Comunicado>(`${environment.apiUrl}/api/departamento/notices/create`, comunicado, this.httpOptions)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return this.http.post<Comunicado>(
              `${environment.apiUrl}/createNotice`,
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
      `${environment.apiUrl}/update/${id}`,
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
    // Garantir que os campos estão no formato correto
    return {
      titulo: comunicado.titulo?.trim() || '',
      conteudo: comunicado.conteudo?.trim() || '',
      noticeStatus: comunicado.noticeStatus || 'VALIDO',
      destinado: comunicado.destinado || 'PROFESSOR',
      dataAcontecimento: this.formatarData(comunicado.dataAcontecimento),
    };
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  private formatData(data: string): string {
    // Garantir formato YYYY-MM-DD
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
      // Campos removidos:
      // - nomeFuncionario (não deve ser atualizável)
      // - dataPublicacao (deve ser definida apenas na criação)
    };
  }
  // Novo método para preparar dados
  private prepararDadosAtualizacao(comunicado: Comunicado): unknown {
    return {
      titulo: comunicado.titulo,
      conteudo: comunicado.conteudo,
      noticeStatus: comunicado.noticeStatus,
      destinado: comunicado.destinado,
      dataAcontecimento: comunicado.dataAcontecimento,
      // Remova campos que não devem ser atualizados
    };
  }

  remover(id: number): Observable<void> {
    return this.http
      .delete<void>(`${environment.apiUrl}/delete/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Método para debug
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
