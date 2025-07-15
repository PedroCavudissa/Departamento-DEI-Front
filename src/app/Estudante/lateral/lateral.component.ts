import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lateral',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './lateral.component.html',
  styleUrls: ['./lateral.component.css'],
})
export class LateralComponent implements OnInit {
  constructor(private router: Router) {}

  menuAtivo = false;
  abaSelecionada = 'Página Inicial';

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
  }

  ngOnInit(): void {
    const aba = localStorage.getItem('abaSelecionada');
    this.abaSelecionada = aba ? aba : 'Página Inicial';
  }

  selecionarMenu(item: string, novoTitulo: string) {
    this.abaSelecionada = item;
    localStorage.setItem('abaSelecionada', item); 
    this.menuAtivo = false;
  
    switch (item) {
      case 'Página Inicial': this.router.navigate(['/tela-estudante']); break;
      case 'Confirmação da Matrícula': this.router.navigate(['/confirmacao1']); break;
      case 'Disciplinas em Atraso': this.router.navigate(['/cadeira']); break;
      case 'Minhas Notas': this.router.navigate(['/tela-notas']); break;
      case 'Horários': this.router.navigate(['/horario-estudante']); break;
      case 'Chat': this.router.navigate(['/chat-estudante']); break;
      case 'Calendário': this.router.navigate(['/calendario-estudante']); break;
      case 'Perfil': this.router.navigate(['/perfil-estudante']); break;
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