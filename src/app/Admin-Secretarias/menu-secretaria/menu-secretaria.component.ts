import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

import { BarralateralSecretariaComponent } from "../barralateral-secretaria/barralateral-secretaria.component";
import { MenuService } from '../../services/menu.service';
import { RelatorioService } from '../../services/relatorio.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [BarralateralSecretariaComponent],
  templateUrl: './menu-secretaria.component.html',
  styleUrls: ['./menu-secretaria.component.css'],
})
export class MenuSecretariaComponent implements OnInit, OnDestroy {
  totalFuncionarios = 0;
  totalCadeiras = 0;
  totalEstudantes = 0;

  private pieChart!: Chart;

  constructor(
    private router: Router,
    private relatorioService: RelatorioService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.carregarDadosGrafico();
  }

  carregarDadosGrafico(): void {
    const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
    if (!pieCtx) return;

    if (this.pieChart) {
      this.pieChart.destroy();
    }

    forkJoin({
      estudantes: this.relatorioService.getTotalEstudantes(),
      cadeiras: this.relatorioService.getTotalCadeiras(),
      funcionarios: this.relatorioService.getTotalFuncionarios(),
    }).subscribe({
      next: ({ estudantes, cadeiras, funcionarios }) => {
        this.totalEstudantes = estudantes;
        this.totalCadeiras = cadeiras;
        this.totalFuncionarios = funcionarios;

        console.log('Totais recebidos:', {
          estudantes,
          cadeiras,
          funcionarios,
        });

        this.pieChart = new Chart(pieCtx, {
          type: 'doughnut',
          data: {
            labels: ['Funcionários', 'Estudantes', 'Cadeiras'],
            datasets: [
              {
                data: [funcionarios, estudantes, cadeiras],
                backgroundColor: ['#009cff', 'orange', 'gray'],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                align: 'start',
                labels: {
                  boxWidth: 30,
                  padding: 10,
                },
              },
            },
          },
        });
      },
      error: (err) => {
        console.error('Erro ao carregar totais:', err);
      },
    });
  }

  verDetalhes(item: string) {
    // implementar navegação ou lógica conforme necessário
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }
}
