import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-barralateral',
  standalone: true,
  imports: [],
  templateUrl: './barralateral.component.html',

  styleUrls: ['./barralateral.component.css']

})
export class BarralateralComponent {
  constructor( private router: Router) {}
  titulo = 'Dados Gerais';
  menuAtivo = false;

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
   
  
  }

  selecionarMenu(item: string,novoTitulo: string) {
    this.titulo = novoTitulo;
    this.menuAtivo = false;

    switch (item) {
      case 'Dados Gerais':
        {this.router.navigate(['/menu']);
        break;}
        case 'Estudantes':
        {this.router.navigate(['/menu-estudantes']);
        break;}
      case 'Funcionários':
        {this.router.navigate(['/']);
        break;}
     

        case 'Disciplinas':
          {this.router.navigate(['/detalhes-cadeiras']);
          break;}
         
             
              case 'Chat':
                {this.router.navigate(['/chat']);
                break;}

                
                case 'Calendário':
                {this.router.navigate(['/calendario']);
                break;}
                
                case 'Matrículas':
                {this.router.navigate(['/pautas']);
                break;}

        case 'Sair':
         { const confirmacao = window.confirm('Tem certeza que deseja sair?');
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

