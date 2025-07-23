<<<<<<< HEAD
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import { RelatorioService } from '../../Services/relatorio.service';
=======
import { Component } from '@angular/core';
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
import { BarralateralComponent } from '../barralateral/barralateral.component';

Chart.register(...registerables);
<<<<<<< HEAD

=======
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [BarralateralComponent],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
<<<<<<< HEAD
=======

>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
})
export class MenuAdminComponent implements OnInit, OnDestroy {
  totalFuncionarios = 0;
  totalCadeiras = 0;
  totalEstudantes = 0;

<<<<<<< HEAD
  private pieChart!: Chart;

  constructor(
    private router: Router,
    private relatorioService: RelatorioService
  ) {}
=======
  constructor(private router: Router) {}
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f

  ngOnInit(): void {
    this.carregarDadosGrafico();
  }

<<<<<<< HEAD
  carregarDadosGrafico(): void {
    const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
    if (!pieCtx) return;
=======
  /*async ngAfterViewInit(): Promise<void> {
    try {
      const [estudantes, funcionarios] = await Promise.all([
        this.service.getTotalEstudantes(),
        this.service.getTotalFuncionarios(),
      ]);
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f

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
<<<<<<< HEAD
}
=======

  verDetalhes(nome: string): void {
    switch (nome) {
      case 'funcionarios':
        this.router.navigate(['/detalhes-funcionarios']);
        break;
      case 'estudantes':
        this.router.navigate(['/detalhes-estudantes']);
        break;
      case 'cadeiras':
        this.router.navigate(['/detalhes-cadeiras']);
        break;
      case 'salas':
        alert('Dados Indisponíveis');
        break;
      default:
        alert('Dados não disponíveis');
    }
  }

  toggleTheme(): void {
    const isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }*/

  }
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
