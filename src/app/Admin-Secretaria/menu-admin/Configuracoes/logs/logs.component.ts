import { Component, OnInit } from '@angular/core';
import { LogRegistro, LogsService } from '../../../../services/logs.service';
import { BarralateralComponent } from "../../../barralateral/barralateral.component";
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FuncionarioService } from '../../../../services/cadastro.service';
import { EstudanteService } from '../../../../services/estudante.service';

@Component({
  selector: 'app-logs',
  standalone:true,
  imports: [BarralateralComponent,NgFor,DatePipe],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: LogRegistro[] = [];
  carregando = false;

  constructor(private logsService: LogsService,private funcionarioService: FuncionarioService,private estudanteService: EstudanteService ) {}
  ngOnInit() {
    this.funcionarioService.getLogsFuncionarios().subscribe({
      next: (res) => this.logs = res,
      error: (err) => console.error('Erro ao carregar logs:', err)
    });
    this.estudanteService.getLogsEstudantes().subscribe({
      next: (res) => this.logs = [...this.logs, ...res],
      error: (err) => console.error('Erro ao carregar logs:', err)
    });
  }
}
