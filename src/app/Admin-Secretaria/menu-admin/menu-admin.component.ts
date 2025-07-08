<<<<<<< HEAD
import { BarralateralComponent } from '../barralateral/barralateral.component';
import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { BarralateralSecretariaComponent } from "../../Admin-Secretarias/barralateral-secretaria/barralateral-secretaria.component";
=======
import { Component } from '@angular/core';
import { MenuAdminService } from '../../Services/relatorio.service';
import { BarralateralComponent } from '../barralateral/barralateral.component';
import { Route, Router } from '@angular/router';
import {
  Chart,
  ChartConfiguration,
  registerables
} from 'chart.js';

Chart.register(...registerables);

>>>>>>> Dev

@Component({
  selector: 'app-menu-admin',
  standalone: true,
<<<<<<< HEAD
  imports: [BarralateralComponent, BarralateralSecretariaComponent],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
})
export class MenuAdminComponent implements AfterViewInit {
=======
  imports: [BarralateralComponent],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
  providers: [MenuAdminService],
})
export class MenuAdminComponent {
>>>>>>> Dev
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

<<<<<<< HEAD
  ngAfterViewInit(): void {
    const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Funcionários', 'Estudantes', 'Cadeiras', 'Salas'],
        datasets: [
          {
            data: [27, 97, 52, 70],
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

  constructor(private router: Router) {}

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

  //Altera Tema
=======
  estudantes: unknown;
  totalEstudantes = 0;
  totalFuncionarios = 0;

  constructor(private router: Router, private service: MenuAdminService) {}

>>>>>>> Dev
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

<<<<<<< HEAD
  toggleTheme(): void {
    alert('Fui clicado');
    const isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  }
=======
  async ngAfterViewInit(): Promise<void> {
    try {
      const [estudantes, funcionarios] = await Promise.all([
        this.service.getTotalEstudantes(),
        this.service.getTotalFuncionarios(),
      ]);

      this.totalEstudantes = estudantes;
      this.totalFuncionarios = funcionarios;

      const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
      new Chart(pieCtx, {
        type: 'doughnut',
        data: {
          labels: ['Funcionários', 'Estudantes', 'Cadeiras', 'Salas'],
          datasets: [
            {
              data: [funcionarios, estudantes, 52, 70],
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
    } catch (error) {
      console.error('Erro ao carregar dados dos gráficos', error);
    }
  }

  verDetalhes(item: string){
   switch(item){
    case'salas':
    this.router.navigate(['/detalhes-cadeiras'])
    break;
    case'Funcionários':
    this.router.navigate(['/detalhes-funcionários'])
    break;
    case'Estudantes':
    this.router.navigate(['/detalhes-estudantes'])
    break;
    
   }
  }

  

>>>>>>> Dev
}
