import { Router } from '@angular/router';
import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
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

  // Exemplo de cores para o gráfico de barras
  colors: Record<string, string> = {
    'Janeiro': '#009cff',
    'Fevereiro': 'orange',
    'Março': 'gray',
    'Abril': 'gold',
    'Maio': '#4caf50'
  };

  // Configurações comuns
  opts: any = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(
    private router: Router,
    private relatorioService: RelatorioService
  ) {}

  ngOnInit(): void {
    this.carregarDadosGrafico();
  }

  carregarDadosGrafico(): void {
    const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
    const barCtx = document.getElementById('bar-chart') as HTMLCanvasElement;

    if (!pieCtx || !barCtx) return;

    if (this.pieChart) {
      this.pieChart.destroy(); // Destrói gráfico anterior se existir
    }

    forkJoin({
      estudantes: this.relatorioService.getTotalEstudantes(),
      cadeiras: this.relatorioService.getTotalCadeiras(),
      funcionarios: this.relatorioService.getTotalFuncionarios()
    }).subscribe({
      next: ({ estudantes, cadeiras, funcionarios }) => {
        this.totalEstudantes = estudantes;
        this.totalCadeiras = cadeiras;
        this.totalFuncionarios = funcionarios;

        console.log('Totais recebidos:', {
          estudantes,
          cadeiras,
          funcionarios
        });

        // Gráfico tipo "pizza"
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
          }
        });

        // Gráfico de barras
        const barLabels = Object.keys(this.colors);
        new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: barLabels,
            datasets: [
              {
                data: [100, 68, 38, 25, 10], 
                backgroundColor: barLabels.map(label => this.colors[label]),
              },
            ],
          },
          options: {
            ...this.opts,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: { beginAtZero: true }
            }
          }
        });
      },
      error: (err) => {
        console.error('Erro ao carregar totais:', err);
      }
    });
  }

  verDetalhes(nome: string): void {
  
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }
}
