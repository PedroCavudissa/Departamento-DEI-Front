import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration } from 'chart.js';
import { MenuAdminService } from '../../Services/relatorio.service';
import { BarralateralComponent } from '../barralateral/barralateral.component';

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
  totalEstudantes = 0;
  totalFuncionarios = 0;

  constructor(private router: Router, private service: MenuAdminService) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

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

  verDetalhes(nome: string): void {
    const rotas: Record<string, string> = {
      funcionarios: '/detalhes-funcionarios',
      estudantes: '/detalhes-estudantes',
      cadeiras: '/detalhes-cadeiras',
    };

    if (rotas[nome]) {
      this.router.navigate([rotas[nome]]);
    } else if (nome === 'salas') {
      alert('Dados Indisponíveis');
    } else {
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
    }
  }
}
