import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(http: HttpClient) { }



   getTotalFuncionario(){
    const token=localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  
    const url = 'https://7fa0-102-218-85-74.ngrok-free.app/api/staff/count';
  
    return this.http.get<number>(url, { headers }).pipe(
      map(res => {
        console.log(' Resposta da API (getTotalFuncionáios):', res);
        return res ?? 0;
      })
    );
   }
}
