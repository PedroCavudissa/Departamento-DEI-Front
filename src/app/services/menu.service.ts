import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';

@Injectable({ providedIn: 'root' }) 
export class MenuService {
  private baseUrl = ` ${environment.apiUrl}/api/relatorios`;

  constructor(private http: HttpClient) {}


}
