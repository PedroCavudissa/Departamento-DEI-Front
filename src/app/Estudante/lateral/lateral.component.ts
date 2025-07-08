import { Component } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { LoginComponent } from '../../login/login.component';
=======
>>>>>>> Dev

@Component({
  selector: 'app-lateral',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './lateral.component.html',
  styleUrl: './lateral.component.css',
})
export class LateralComponent {
  constructor(private router: Router) {}
  titulo = 'Olá, Pedro José Cavudissa';
=======

  imports: [],


  templateUrl: './lateral.component.html',
  styleUrls: ['./lateral.component.css'],
})
export class LateralComponent {
  constructor(private router: Router) {}

  titulo = 'Olá, Pedro Cavudissa';
>>>>>>> Dev
  menuAtivo = false;

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
  }

<<<<<<< HEAD
  selecionarMenu(item: string, novoTitulo: string) {
=======
  selecionarMenu(item: string, novoTitulo: string): void {
>>>>>>> Dev
    this.titulo = novoTitulo;
    this.menuAtivo = false;

    switch (item) {
      case 'Página Inicial': {
        this.router.navigate(['/tela-estudante']);
        break;
<<<<<<< HEAD
      }
      case 'Confirmação da Matrícula': {
=======
      case 'Confirmação da Matrícula':
>>>>>>> Dev
        this.router.navigate(['/confirmacao1']);
        break;
      }
      case 'Disciplinas em Atraso': {
        this.router.navigate(['/cadeira']);
        break;
      }
      case 'Minhas Notas': {
        this.router.navigate(['/tela-notas']);
        break;
<<<<<<< HEAD
      }

      case 'Perfil': {
        this.router.navigate(['/perfil-estudante']);
        break;
      }
      case 'Sair': {
        const confirmacao = window.confirm('Tem certeza que deseja sair?');
=======
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
>>>>>>> Dev
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
