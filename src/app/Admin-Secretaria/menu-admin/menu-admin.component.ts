import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarralateralComponent } from '../barralateral/barralateral.component';
import { Router } from '@angular/router';
import {
  Chart,
  ChartConfiguration,
  registerables
} from 'chart.js';
import { EstudanteService } from '../../services/estudante.service';
import { DisciplinaService } from '../../services/disciplina.service';
import { FuncionarioService } from '../../services/cadastro.service';
import { forkJoin } from 'rxjs';

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
    private serviceEstudante: EstudanteService,
    private serviceDisciplina: DisciplinaService,
    private serviceFuncionario: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.carregarDadosGrafico();
  }

  carregarDadosGrafico(): void {
    const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
    if (!pieCtx) return;

    if (this.pieChart) {
      this.pieChart.destroy(); // destrói se existir
    }

    forkJoin({
      estudantes: this.serviceEstudante.getTotalEstudantes(),
      cadeiras: this.serviceDisciplina.getTotalCadeiras(),
      funcionarios: this.serviceFuncionario.getTotalFuncionario()
    }).subscribe({
      next: ({ estudantes, cadeiras, funcionarios }) => {
        this.totalEstudantes = estudantes;
        this.totalCadeiras = cadeiras;
        this.totalFuncionarios = funcionarios;

        console.log(' Totais recebidos:', {
          estudantes,
          cadeiras,
          funcionarios
        });

        this.pieChart = new Chart(pieCtx, {
          type: 'bar',
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
        console.error(' Erro ao carregar totais:', err);
      }
    });
  }

  verDetalhes(item: string) {
    switch (item) {
      case 'salas':
        this.router.navigate(['/detalhes-cadeiras']);
        break;
      case 'Funcionários':
        this.router.navigate(['/detalhes-funcionários']);
        break;
      case 'Estudantes':
        this.router.navigate(['/detalhes-estudantes']);
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }
}
