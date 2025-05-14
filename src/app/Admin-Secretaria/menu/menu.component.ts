import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { Chart,ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ BarralateralComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent  implements AfterViewInit{

  colors: Record<string, string> = {
    '1º Ano': '#009cff',
    '2º Ano': '#ff9400',
    '3º Ano': '#808080',
    '4º Ano': '#ffe600',
    '5º Ano': '#004080'
  };
  
  opts: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  ngAfterViewInit(): void {
    const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Funcionários', 'Estudantes','Cadeiras','Salas'],
        datasets: [{
          data: [27, 97,52,70],
          backgroundColor: ['#009cff', 'orange','gray','gold']
        }]
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
              padding: 10
            }
          }
        }
      }
    
    });
    const barLabels = Object.keys(this.colors);
    const barCtx = document.getElementById('bar-chart') as HTMLCanvasElement;
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: barLabels,
        datasets: [{
          data: [100, 68, 38, 25, 10],
          backgroundColor: barLabels.map(label => this.colors[label])
        }]
      },  
      options: {
        ...this.opts,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  constructor( private router: Router) {}

  verDetalhes(nome : string): void {
    
    switch(nome){
     case'funcionarios':
    
      {this.router.navigate(['/detalhes-funcionarios'])
      break; }
      case'estudantes':
    
      {this.router.navigate(['/detalhes-estudantes'])
      break; }

      case'cadeiras':
    
      {this.router.navigate(['/detalhes-cadeiras'])
      break; }
      case'salas':
    alert("Dados Indisponíveis")
    break;
      default:
        alert("Dados não disponíveis")
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
    alert("Fui clicado")
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