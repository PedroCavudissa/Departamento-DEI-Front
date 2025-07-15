import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { EstudanteService, Estudante } from '../../../services/estudante.service';

Chart.register(...registerables);

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [BarralateralComponent],
  templateUrl: './menu-estudantes.component.html',
  styleUrls: ['./menu-estudantes.component.css'],
})
export class MenuEstudantesComponent implements AfterViewInit {
  colors: Record<string, string> = {
    '1º Ano': '#009cff',
    '2º Ano': '#ff9400',
    '3º Ano': '#808080',
    '4º Ano': '#ffe600',
    '5º Ano': '#004080',
  };

  constructor(private estudanteService: EstudanteService) {}

  ngAfterViewInit(): void {
    this.gerarGraficos();
  }

  gerarGraficos(): void {
    const anos = [1, 2, 3, 4, 5];
    const labels = anos.map(ano => `${ano}º Ano`);

    // Buscar estudantes de todos os anos
    Promise.all(anos.map(ano => 
      this.estudanteService.getEstudantesPorAno(ano).toPromise()
    )).then(resultados => {
      const totaisPorAno = resultados.map(estudantes => (estudantes?.length || 0));

      const totalMatriculados = totaisPorAno.reduce((soma, atual) => soma + atual, 0);

      // Gráfico de Pizza
      const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
      new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['Total Matriculados'],
          datasets: [{
            data: [totalMatriculados],
            backgroundColor: ['#009cff'],
          }],
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

      // Gráfico de Barras
      const barCtx = document.getElementById('bar-chart') as HTMLCanvasElement;
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Estudantes por Ano',
            data: totaisPorAno,
            backgroundColor: labels.map(label => this.colors[label]),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }).catch(err => {
      console.error('❌ Erro ao gerar gráficos:', err);
    });
  }
}
