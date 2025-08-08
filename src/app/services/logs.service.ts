import { Injectable } from '@angular/core';
import { EstudanteService } from './estudante.service';
import { FuncionarioService } from './cadastro.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LogRegistro {
  acao: string;
  entidade: string;
  entidadeId: number;
  criadoPor: string;
  data: Date;
}

@Injectable({ providedIn: 'root' })
export class LogsService {
  constructor(
    private estudanteService: EstudanteService,
    private secretarioService: FuncionarioService,
  ) {}

  carregarTodosLogs(): Observable<LogRegistro[]> {
    return forkJoin([
      this.estudanteService.getLogsEstudantes(),
      this.secretarioService.getLogsFuncionarios(),
    ]).pipe(
      map(([estudantes, funcionarios]: [LogRegistro[], LogRegistro[]]) =>
        [...estudantes, ...funcionarios].sort(
          (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
        )
      )
    );
  }
}
