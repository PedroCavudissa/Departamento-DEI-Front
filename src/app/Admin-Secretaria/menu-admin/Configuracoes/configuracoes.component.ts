import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BarralateralComponent } from "../../barralateral/barralateral.component";

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css'],
  standalone: true,
  imports: [RouterModule, BarralateralComponent] 

})
export class ConfiguracoesComponent {
  
  sidebarActive = false;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarActive = !this.sidebarActive;
  }

selecionar(select: string){
  switch(select){
    default:
    case 'Perfil':
      {this.router.navigate(['/Gerirperfis'])};
      break;
      case 'Horário':
        {this.router.navigate(['/Horarios'])};
        break;
        case 'Pautas':
          {this.router.navigate(['/pautas'])};
          break;
          case 'Aprovar':
            {this.router.navigate(['/aprovar-comunicado'])};
            break;

            case 'Horários':
              {this.router.navigate(['/horario'])};
              break;
  }
}
}
