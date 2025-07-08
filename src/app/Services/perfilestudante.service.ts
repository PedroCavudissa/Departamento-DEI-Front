

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilestudanteService {

  
  private apiUrl = 'https://14f411305204.ngrok-free.app/api/auth/me/update-profile'; // Substitua pela sua URL

  constructor(private http: HttpClient) { }

  atualizarPerfil(dados: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/perfil`, dados);
  }

  alterarSenha(novaSenha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/alterar-senha`, { senha: novaSenha });

  }
}

