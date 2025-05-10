import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { Chart,ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ BarralateralComponent,LoginComponent],
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
      type: 'pie',
      data: {
        labels: ['Funcionários', 'Estudantes','Cadeiras','Salas'],
        datasets: [{
          data: [97, 33,12,34],
          backgroundColor: ['#009cff', 'orange','gray','gold']
        }]
      },
    
    });
    const barLabels = Object.keys(this.colors);
    const barCtx = document.getElementById('bar-chart') as HTMLCanvasElement;
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: barLabels,
        datasets: [{
          data: [10, 208, 18, 15, 101],
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

 
}