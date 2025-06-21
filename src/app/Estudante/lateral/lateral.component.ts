import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-lateral',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './lateral.component.html',
  styleUrls: ['./lateral.component.css'], // Correto: plural
})
export class LateralComponent {
  constructor(private router: Router) {}

  titulo = 'Olá, Pedro Cavudissa';
  menuAtivo = false;

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
  }

  selecionarMenu(item: string, novoTitulo: string): void {
    this.titulo = novoTitulo;
    this.menuAtivo = false;

    switch (item) {
      case 'Página Inicial':
        this.router.navigate(['/tela-estudante']);
        break;
      case 'Confirmação da Matrícula':
        this.router.navigate(['/confirmacao1']);
        break;
      case 'Disciplinas em Atraso':
        this.router.navigate(['/cadeira']);
        break;
      case 'Minhas Notas':
        this.router.navigate(['/tela-notas']);
        break;
      case 'Horários':
        this.router.navigate(['/horario-estudante']);
        break;
      case 'Calendário':
        this.router.navigate(['/calendario-estudante']);
        break;
      case 'Perfil':
        this.router.navigate(['/perfil-estudante']);
        break;
      case 'Chat':
        this.router.navigate(['/chat-estudante']);
        break;
      case 'Sair': {
        const confirmacao: boolean = window.confirm(
          'Tem certeza que deseja sair?'
        );
        if (confirmacao) {
          this.router.navigate(['/login']);
        }
        break;
      }
      default:
        alert('Menu não reconhecido.');
        break;
    }
  }
}
