import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-barralateral-secretaria',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './barralateral-secretaria.component.html',

  styleUrls: ['./barralateral-secretaria.component.css']

})
export class BarralateralSecretariaComponent {
  constructor( private router: Router) {}
  titulo = 'Dados Gerais';
  menuAtivo = false;

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
   
  
  }


  selecionarMenu(novoTitulo: string,item: string,) {

    this.titulo = novoTitulo;
    this.menuAtivo = false;

    switch (item) {
      case 'Dados Gerais':
        {this.router.navigate(['/menu-secretaria']);
        break;}
        case 'Estudantes':
        {this.router.navigate(['/estudantes-secretaria']);
          
        break;}
      case 'Funcionários':
        {this.router.navigate(['funcionario-secretaria']);
        break;}
     

        case 'Disciplinas':
          {this.router.navigate(['/detalhes-cadeiras-secretaria']);
          break;}
         
             
              case 'Chat':
                {this.router.navigate(['/chat-secretaria']);
                break;}

                
                case 'Calendário':
                {this.router.navigate(['/calendario-normal']);
                break;}
                
                case 'Pautas':

                {this.router.navigate(['/ver-pauta-secretaria']);
                break;}
                   
                case 'Horários':
                {this.router.navigate(['/horario-secretaria']);

                break;}

                case 'Comunicados':
                  {this.router.navigate(['comunicado-secretaria']);
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

