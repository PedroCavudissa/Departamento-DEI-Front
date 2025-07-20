import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-barralateral-secretaria',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './barralateral-secretaria.component.html',

  styleUrls: ['./barralateral-secretaria.component.css']

})
export class BarralateralSecretariaComponent {
 
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
      case 'Dados Gerais': this.router.navigate(['/menu-secretaria']); break;
      case 'Estudantes': this.router.navigate(['/estudantes-secretaria']); break;
      case 'Funcionários': this.router.navigate(['/funcionarios-secretaria']); break;
      case 'Matrículas': this.router.navigate(['/cadastro']); break;
      case 'Disciplinas': this.router.navigate(['/detalhes-cadeiras-secretaria']); break;
      case 'Horários': this.router.navigate(['/horario-secretaria']); break;
      case 'Pautas': this.router.navigate(['/ver-pauta-secretaria']); break;
      case 'Calendário': this.router.navigate(['/calendario-secretaria']); break;
      case 'Chat': this.router.navigate(['/chat-secretaria']); break;
      case 'Comunicados': this.router.navigate(['/comunicado-secretaria']); break;
      case 'Confirmacões': this.router.navigate(['/confirmacoes']); break;
      
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

