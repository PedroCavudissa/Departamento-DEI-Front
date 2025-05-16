import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BarralateralComponent } from '../../barralateral/barralateral.component';

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

  opts: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  ngAfterViewInit(): void {
    const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Matriculados', 'Não matriculados'],
        datasets: [
          {
            data: [97, 33],
            backgroundColor: ['#009cff', '#ff9400'],
          },
        ],
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
            data: [10, 208, 18, 15, 101],
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
    const barLabel = ['5º Ano', '4º Ano', '3º Ano', '2º Ano', '1º Ano'];
    const barData = [10, 3, 2, 4, 30];
    const colors: Record<string, string> = {
      '5º Ano': '#009cff',
      '4º Ano': '#009cff',
      '3º Ano': '#009cff',
      '2º Ano': '#009cff',
      '1º Ano': '#009cff',
    };

    // Criar legenda customizada

    // Criar gráfico de barras horizontais
    const ctx = document.getElementById('horizontal-bar') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: barLabel,
        datasets: [
          {
            data: barData,
            backgroundColor: barLabel.map((label) => colors[label]),
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
