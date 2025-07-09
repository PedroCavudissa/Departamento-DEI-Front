import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfiprofService {

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
atualizarSenha(senhaAtual:string,novaSenha:string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/api/auth/me/update-password`,{
    headers: this.getHeaders()
  });
}


}

