<<<<<<< HEAD
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration } from 'chart.js';
import { MenuAdminService } from '../../Services/relatorio.service';
import { BarralateralComponent } from '../barralateral/barralateral.component';
=======

import { Router } from '@angular/router';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { BarralateralComponent } from "../barralateral/barralateral.component";
>>>>>>> main

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [BarralateralComponent],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
  providers: [MenuAdminService],
})
export class MenuAdminComponent implements AfterViewInit, OnInit {
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
  totalEstudantes = 9;
  totalFuncionarios = 0;

  constructor(
    private router: Router,
    private service: MenuAdminService
  ) {}

  async ngAfterViewInit(): Promise<void> {
    try {
      // Espera corretamente as promessas
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
    const rotas: Record<string, string> = {
      funcionarios: '/detalhes-funcionarios',
      estudantes: '/detalhes-estudantes',
      cadeiras: '/detalhes-cadeiras',
    };

<<<<<<< HEAD
    if (rotas[nome]) {
      this.router.navigate([rotas[nome]]);
=======
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
   ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  toggleTheme(): void {
    alert('Fui clicado');
    const isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
>>>>>>> main
    } else {
      alert('Dados não disponíveis');
    }
  }
}
