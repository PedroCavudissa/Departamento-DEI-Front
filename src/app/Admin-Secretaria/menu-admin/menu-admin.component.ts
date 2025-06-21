import { Component } from '@angular/core';
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

  
}
