import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
<<<<<<< HEAD
import { BarralateralSecretariaComponent } from '../barralateral-secretaria/barralateral-secretaria.component';
=======
import { BarralateralSecretariaComponent } from "../barralateral-secretaria/barralateral-secretaria.component";
import { MenuService } from '../../Services/menu.service';
>>>>>>> Dev

@Component({
  selector: 'app-menu-admin',
  standalone: true,
<<<<<<< HEAD
  imports: [ BarralateralSecretariaComponent],
=======
  imports: [BarralateralSecretariaComponent],
>>>>>>> Dev
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
<<<<<<< HEAD

  ngAfterViewInit(): void {
=======
  async ngAfterViewInit(): Promise<void> {
    const funcionarios = await this.menuService.getTotalFuncionarios();
    const estudantes = await this.menuService.getTotalEstudantes();
    const cadeiras = await this.menuService.getTotalCadeiras();; // Substitua se tiver endpoint
    const salas = 70;    // Substitua se tiver endpoint
  
>>>>>>> Dev
    const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Funcionários', 'Estudantes', 'Cadeiras', 'Salas'],
        datasets: [
          {
<<<<<<< HEAD
            data: [27, 97, 52, 70],
=======
            data: [funcionarios, estudantes, cadeiras, salas],
>>>>>>> Dev
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
<<<<<<< HEAD
=======
  
>>>>>>> Dev
    const barLabels = Object.keys(this.colors);
    const barCtx = document.getElementById('bar-chart') as HTMLCanvasElement;
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: barLabels,
        datasets: [
          {
<<<<<<< HEAD
            data: [100, 68, 38, 25, 10],
=======
            data: [100, 68, 38, 25, 10], // substitua se quiser também via API
>>>>>>> Dev
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
<<<<<<< HEAD

  constructor(private router: Router) {}
=======
  

  constructor(
    private router: Router,
    private menuService: MenuService
  ) {}
  
>>>>>>> Dev

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
}
