import { Component } from '@angular/core';
import { BarralateralComponent } from '../barralateral/barralateral.component';
import { Route, Router } from '@angular/router';
import {
  Chart,
  ChartConfiguration,
  registerables
} from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [BarralateralComponent],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],

})
export class MenuAdminComponent {
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

  estudantes: unknown;
  totalEstudantes = 0;
  totalFuncionarios = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  /*async ngAfterViewInit(): Promise<void> {
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