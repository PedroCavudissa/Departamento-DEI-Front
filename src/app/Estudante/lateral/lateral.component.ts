import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../Admin-Secretaria/login/login.component';

@Component({
  selector: 'app-lateral',
  standalone: true, 
  imports: [LoginComponent],
  templateUrl: './lateral.component.html',
  styleUrl: './lateral.component.css'
})
export class LateralComponent {
  constructor( private router: Router) {}
  titulo = 'Olá, Pedro José Cavudissa' ;
  menuAtivo: boolean = false;

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
  }
 

  selecionarMenu(item: string,novoTitulo: string) {
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
        case 'Sair':
          const confirmacao = window.confirm('Tem certeza que deseja sair?');
          if (confirmacao) {
            this.router.navigate(['/login']);
          }
          break;
      default:
        alert('Menu não reconhecido.');
        break;
    }
  }
  
}
