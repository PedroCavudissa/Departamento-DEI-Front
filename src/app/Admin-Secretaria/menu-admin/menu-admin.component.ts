import { BarralateralComponent } from '../barralateral/barralateral.component';
import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [BarralateralComponent],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
})
export class MenuAdminComponent implements AfterViewInit {
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

  constructor(private router: Router, private http: HttpClient) {}

  async ngAfterViewInit(): Promise<void> {
    try {
    
        const estudantesResponse = await this.http
        .get<{ total: number }>('https://ec5f-105-172-62-238.ngrok-free.app/api/relatorios/estudante/total')
        .toPromise();
      
        const funcionariosResponse = await this.http
      .get<{ total: number }>('https://ec5f-105-172-62-238.ngrok-free.app/api/relatorios/funcionario/total')
      .toPromise();
   
    const totalEstudantes = estudantesResponse?.total ?? 0;
    const totalFuncionarios = funcionariosResponse?.total ?? 0;
    
     

      const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
      new Chart(pieCtx, {
        type: 'doughnut',
        data: {
          labels: ['Funcionários', 'Estudantes', 'Cadeiras', 'Salas'],
          datasets: [
            {
              data: [totalFuncionarios, totalEstudantes, 52, 70], 
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
}
