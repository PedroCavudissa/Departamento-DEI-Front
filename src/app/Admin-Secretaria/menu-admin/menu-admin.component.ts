import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import { RelatorioService } from '../../services/relatorio.service';
import { BarralateralComponent } from '../barralateral/barralateral.component';

Chart.register(...registerables);

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [BarralateralComponent],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
})
export class MenuAdminComponent implements OnInit, OnDestroy {
  totalFuncionarios = 0;
  totalCadeiras = 0;
  totalEstudantes = 0;

  private pieChart!: Chart;

  constructor(
    private router: Router,
    private relatorioService: RelatorioService
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
    switch (item.toLowerCase()) {
      case 'cadeiras':
      case 'salas':
        this.router.navigate(['/detalhes-cadeiras']);
        break;
      case 'funcionários':
        this.router.navigate(['/detalhes-funcionarios']);
        break;
     
      default:
        console.warn('Item desconhecido:', item);
    }
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }
}
