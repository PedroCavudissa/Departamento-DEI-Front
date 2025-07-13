import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';

@Injectable({ providedIn: 'root' }) 
export class MenuService {
  private baseUrl = ` ${environment.apiUrl}/api/relatorios`;

  constructor(private http: HttpClient) {}

  getTotalEstudantes(): Promise<number> {
    return this.http
      .get<{ total: number }>(`${this.baseUrl}/estudante/total`)
      .toPromise()
      .then(res => res?.total ?? 0);
  }

  getTotalFuncionarios(): Promise<number> {
    return this.http
      .get<{ total: number }>(`${this.baseUrl}/funcionario/total`)
      .toPromise()
      .then(res => res?.total ?? 0);
  }

  getTotalCadeiras(): Promise<number> {
    return this.http
      .get<{ total: number }>(`${this.baseUrl}/funcionario/total`)
      .toPromise()
      .then(res => res?.total ?? 0);
  }
}
