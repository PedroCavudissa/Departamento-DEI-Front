import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

interface ApiResponse {
  content: any[];
  totalElements: number;
}

@Injectable({
  providedIn: 'root'
})
export class GerirPerfilService {
  private readonly apiUrl = 'https://5e457bae9840.ngrok-free.app/api/auth/users';

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<any[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.content),
      catchError(this.handleError)
    );
  }

  public atualizarStatus(userId: number, status: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}/status`, { active: status }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro na requisição:', error);
    throw new Error('Erro ao processar a requisição');
  }
}