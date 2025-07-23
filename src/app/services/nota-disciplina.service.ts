import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaDisciplinaRequest, NotaDisciplinaResponse } from '../models/nota-disciplina.model';

@Injectable({ providedIn: 'root' })
export class NotaDisciplinaService {
  private readonly baseUrl = 'https://9c257c8cf488.ngrok-free.app/api/departamento/students/list/myscore';

  constructor(private http: HttpClient) {}

  getNotaPorDisciplina(request: NotaDisciplinaRequest): Observable<NotaDisciplinaResponse> {
    const params = this.buildParams(request);
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });

    return this.http.get<NotaDisciplinaResponse>(
      `${this.baseUrl}/${encodeURIComponent(request.disciplina)}`,
      { params, headers }
    );
  }

  private buildParams(request: NotaDisciplinaRequest): HttpParams {
    let params = new HttpParams()
      .set('disciplina', request.disciplina)
      .set('modelo', request.modelo);

    if (request.anoLetivo) {
      params = params.set('anoLetivo', request.anoLetivo.toString());
    }

    return params;
  }
}
