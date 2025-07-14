import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lateral-professor',
  standalone: true, 
  imports: [],
  templateUrl: 'lateral-professor.component.html',
  styleUrl: './lateral-professor.component.css'
})
export class LateralProfessorComponent {
  constructor( private router: Router) {}
  titulo = 'Olá, Pedro José Cavudissa' ;
  menuAtivo = false;

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
  }
 

  selecionarMenu(item: string,novoTitulo: string) {
    this.titulo = novoTitulo;
    this.menuAtivo = false;
    switch (item) {
      case 'Página Inicial':
        {this.router.navigate(['/tela-professor']);
        break;}
       
        case 'Perfil':
          {this.router.navigate(['/dado-professor']);
          break;}
          case 'Horários':
            {this.router.navigate(['/horario-professor']);
            break;}
            case 'Calendário': {
              this.router.navigate(['/calendario-professor']);
              break;
            }
            case 'Chat':
              {this.router.navigate(['/chat-professor']);
              break;}
             
              case 'Lançamento':
                {this.router.navigate(['/lancamento']);
                break;}
          case 'Pautas':
              {this.router.navigate(['/ver-pauta-professor']);
                break;}
        case 'Sair':
          {const confirmacao = window.confirm('Tem certeza que deseja sair?');
          if (confirmacao) {
            this.router.navigate(['/login']);
          }
          break;}
      default:
        alert('Menu não reconhecido.');
        break;
  }
  
}
}