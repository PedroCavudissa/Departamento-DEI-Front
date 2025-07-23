<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from "../../login/login.component";
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f

@Component({
  selector: 'app-lateral',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterModule,FormsModule,CommonModule],
=======
  imports:[LoginComponent],
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
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
      case 'Calendario': this.router.navigate(['/calendario-estudante']); break;
      case 'Perfil': this.router.navigate(['/perfil-estudante']); break;
      case 'Comunicado': this.router.navigate(['/comunicado-estudante']); break;
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