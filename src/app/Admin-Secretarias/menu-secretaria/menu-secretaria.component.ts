import { Router } from '@angular/router';
import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

import { BarralateralSecretariaComponent } from "../barralateral-secretaria/barralateral-secretaria.component";
<<<<<<< HEAD
import { MenuService } from '../../Services/menu.service';
=======

import { MenuService } from '../../services/menu.service';
import { RelatorioService } from '../../services/relatorio.service';
import { forkJoin } from 'rxjs';
>>>>>>> origin

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

<<<<<<< HEAD
  opts: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };
  async ngAfterViewInit(): Promise<void> {
    const funcionarios = await this.menuService.getTotalFuncionarios();
    const estudantes = await this.menuService.getTotalEstudantes();
    const cadeiras = await this.menuService.getTotalCadeiras();; // Substitua se tiver endpoint
    const salas = 70;    // Substitua se tiver endpoint

    const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Funcionários', 'Estudantes', 'Cadeiras', 'Salas'],
        datasets: [
          {
            data: [funcionarios, estudantes, cadeiras, salas],
            backgroundColor: ['#009cff', 'orange', 'gray', 'gold'],
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

    const barLabels = Object.keys(this.colors);
    const barCtx = document.getElementById('bar-chart') as HTMLCanvasElement;
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: barLabels,
        datasets: [
          {
            data: [100, 68, 38, 25, 10], // substitua se quiser também via API
            backgroundColor: barLabels.map((label) => this.colors[label]),
          },
        ],
      },
      options: {
        ...this.opts,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

=======
  private pieChart!: Chart;
>>>>>>> origin

  constructor(
    private router: Router,
    private relatorioService: RelatorioService
  ) {}
<<<<<<< HEAD

=======
>>>>>>> origin

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
   
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }
}
