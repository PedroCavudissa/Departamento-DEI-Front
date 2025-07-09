
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilestudanteService {

 private apiUrl = 'https://fd04630eeda8.ngrok-free.app'; // Substitua pela sua URL
  
 constructor(private http: HttpClient) { }
    private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true' // Adicione esta linha para evitar avisos do ngrok
    });
  }
  /*
alterarSenha(senhaAtual: string, novaSenha: string): Observable<any> {
  const body = {
    currentPassword: senhaAtual,  // ou "senhaAtual" dependendo do que sua API espera
    newPassword: novaSenha       // ou "novaSenha" dependendo do que sua API espera
  };

  return this.http.put<any>(
    `${this.apiUrl}/api/auth/me/update-password`, 
    body,  // Corpo da requisição com as senhas
    { headers: this.getHeaders(),

         responseType: 'text' as ResponseType
    }  // Configuração dos headers

  );
}*/



alterarSenha(senhaAtual: string, novaSenha: string): Observable<any> {
  const body = {
    currentPassword: senhaAtual,
    newPassword: novaSenha
  };

  // Solução 1: Usando request() diretamente
  const req = new HttpRequest(
    'PUT',
    `${this.apiUrl}/api/auth/me/update-password`,
    body,
    {
      headers: this.getHeaders(),
      responseType: 'text'
    }
  );

  return this.http.request(req).pipe(
    map(event => {
      if (event instanceof HttpResponse) {
        return event.body;
      }
      return null;
    }),
    filter(Boolean)
  );
}
}

