import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lateral-professor',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: 'lateral-professor.component.html',
  styleUrls: ['./lateral-professor.component.css']
})
export class LateralProfessorComponent implements OnInit {
  menuAtivo = false;
  abaSelecionada = 'Página Inicial';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const aba = localStorage.getItem('abaSelecionada');
    this.abaSelecionada = aba ? aba : 'Página Inicial';
  }

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
  }

  selecionarMenu(item: string, novoTitulo: string) {
    this.abaSelecionada = item;
    localStorage.setItem('abaSelecionada', item);
    this.menuAtivo = false;

    switch (item) {
      case 'Página Inicial': this.router.navigate(['/tela-professor']); break;
      case 'Perfil': this.router.navigate(['/perfil-professor']); break;
      case 'Lançamento': this.router.navigate(['/lancamento']); break;
      case 'Ver Pautas': this.router.navigate(['/ver-pauta-professor']); break;
      case 'Minhas Turmas': this.router.navigate(['/minhas-turmas']); break;
      case 'Horários': this.router.navigate(['/horario-professor']); break;
      case 'Calendário': this.router.navigate(['/calendario-professor']); break;
      case 'Chat': this.router.navigate(['/chat-professor']); break;
      case 'Comunicado': this.router.navigate(['/comunicado-professor']); break;

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
