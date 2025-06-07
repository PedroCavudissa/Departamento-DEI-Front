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
        {this.router.navigate(['funcionarios']);
        break;}
     

        case 'Disciplinas':
          {this.router.navigate(['/detalhes-cadeiras']);
          break;}
         
             
              case 'Chat':
                {this.router.navigate(['/chat']);
                break;}

                case 'Matrículas':
                {this.router.navigate(['/cadastro']);
                break;}


                
                case 'Calendário':
                {this.router.navigate(['/calendario']);
                break;}
                
                case 'Pautas':
                {this.router.navigate(['/ver-pauta']);
                break;}
                case 'Horários':
                {this.router.navigate(['/horario']);
                break;}

                case 'Comunicados':
                  {this.router.navigate(['/comunicado']);
                  break;}
  
                  case 'Definições':
                    {this.router.navigate(['/Configuracoes']);
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

