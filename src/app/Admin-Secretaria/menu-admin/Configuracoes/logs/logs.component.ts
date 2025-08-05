import { Component, OnInit } from '@angular/core';
import { LogRegistro, LogsService } from '../../../../services/logs.service';
import { BarralateralComponent } from "../../../barralateral/barralateral.component";
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-logs',
  standalone:true,
  imports: [BarralateralComponent,NgIf,NgFor,DatePipe],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: LogRegistro[] = [];
  carregando = false;

  constructor(private logsService: LogsService) {}

  ngOnInit(): void {
    this.carregarLogs();
  }

  carregarLogs() {
    this.carregando = true;
    this.logsService.carregarTodosLogs().subscribe({
      next: (res) => {
        this.logs = res;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar logs:', err);
        this.carregando = false;
      }
    });
  }
}
