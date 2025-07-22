// comunicado.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface Comunicado {
  id: number;
  titulo: string;
  conteudo: string;
  nomeFuncionario: string;
  noticeStatus: 'VALIDO' | 'INVALIDO';
  destinado: 'PROFESSOR' | 'ESTUDANTE' | 'SECRETARIA' | 'ADMINISTRADOR' | 'TODOS';
  dataAcontecimento: string;
  dataPublicacao: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComunicadosService {
  private readonly API_URL = 'https://9c257c8cf488.ngrok-free.app/api/departamento/notices';

  constructor(private http: HttpClient) { }

  getPorDestino(destino: string): Observable<Comunicado[]> {
    // Validação do parâmetro
    if (!['PROFESSOR', 'ESTUDANTE', 'SECRETARIA', 'ADMINISTRADOR', 'TODOS'].includes(destino)) {
      return throwError(() => new Error('Destino inválido'));
    }

    const url = `${this.API_URL}/destinado/${destino}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });

    return this.http.get<Comunicado[]>(url, { headers }).pipe(
      retry(2), // Tentar novamente em caso de falha
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do servidor
      switch (error.status) {
        case 400:
          errorMessage = this.parse400Error(error);
          break;
        case 404:
          errorMessage = 'Endpoint não encontrado. Verifique a URL.';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }

    console.error('Detalhes completos do erro:', {
      status: error.status,
      message: error.message,
      url: error.url,
      error: error.error
    });

    return throwError(() => new Error(errorMessage));
  }

  private parse400Error(error: HttpErrorResponse): string {
    if (error.error?.message?.includes('Required parameter')) {
      return 'Parâmetro obrigatório faltando. Verifique a documentação da API.';
    }
    return 'Requisição inválida. Verifique os parâmetros enviados.';
  }
}
