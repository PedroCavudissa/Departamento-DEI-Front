import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-barralateral',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './barralateral.component.html',

  styleUrls: ['./barralateral.component.css']

})export class BarralateralComponent implements OnInit {
  titulo = 'Dados Gerais';
  menuAtivo = false;
  abaSelecionada = 'Dados Gerais';

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
  }
  ngOnInit(): void {
    const aba = localStorage.getItem('abaSelecionada');
    this.abaSelecionada = aba ? aba : 'Dados Gerais';
  }
  
  selecionarMenu(item: string, novoTitulo: string) {
    this.abaSelecionada = item;
    localStorage.setItem('abaSelecionada', item); 
    this.titulo = novoTitulo;
    this.menuAtivo = false;
  
    switch (item) {
      case 'Dados Gerais': this.router.navigate(['/menu-admin']); break;
      case 'Estudantes': this.router.navigate(['/menu-estudantes']); break;
      case 'Funcionários': this.router.navigate(['/funcionarios']); break;
      case 'Matrículas': this.router.navigate(['/cadastro']); break;
      case 'Disciplinas': this.router.navigate(['/detalhes-cadeiras']); break;
      case 'Horários': this.router.navigate(['/horario']); break;
      case 'Pautas': this.router.navigate(['/ver-pauta']); break;
      case 'Calendário': this.router.navigate(['/calendario']); break;
      case 'Chat': this.router.navigate(['/chat']); break;
      case 'Comunicados': this.router.navigate(['/comunicado']); break;
      case 'Definições': this.router.navigate(['/Configuracoes']); break;
      case 'Sair':
        const confirmacao = window.confirm('Tem certeza que deseja sair?');
        if (confirmacao) {
          localStorage.removeItem('token');
          localStorage.removeItem('abaSelecionada');
          this.router.navigate(['/login']);
        }
        break;
      default:
        alert('Menu não reconhecido.');
        break;
    }
  }
  
}
