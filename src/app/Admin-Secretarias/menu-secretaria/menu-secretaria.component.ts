import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

import { BarralateralSecretariaComponent } from "../barralateral-secretaria/barralateral-secretaria.component";
import { MenuService } from '../../Services/menu.service';


@Component({
  selector: 'app-menu-admin',
  standalone: true,

  imports: [BarralateralSecretariaComponent],

  templateUrl: './menu-secretaria.component.html',
  styleUrls: ['./menu-secretaria.component.css'],
})
export class MenuSecretariaComponent implements AfterViewInit {
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

  constructor(private router: Router){}
  async ngAfterViewInit(): Promise<void> {
    const funcionarios = 12;
    const estudantes = 23;
    const cadeiras = 21; // Substitua se tiver endpoint
    const salas = 70;    // Substitua se tiver endpoint
  

    const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Funcionários', 'Estudantes', 'Cadeiras'],
        datasets: [
          {

            
            data: [funcionarios, estudantes, cadeiras],

            
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

            data: [100, 68, 38, 25, 10], 

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

  
  


  verDetalhes(nome: string): void {
    switch (nome) {
      case 'funcionarios': {
        this.router.navigate(['/detalhes-funcionarios']);
        break;
      }
      case 'estudantes': {
        this.router.navigate(['/detalhes-estudantes']);
        break;
      }

      case 'cadeiras': {
        this.router.navigate(['/detalhes-cadeiras']);
        break;
      }
      case 'salas':
        alert('Dados Indisponíveis');
        break;
      default:
        alert('Dados não disponíveis');
    }
  }


}
