import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css'],
  standalone: true,
  imports: [RouterModule] 

})
export class ConfiguracoesComponent {
  
  sidebarActive = false;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarActive = !this.sidebarActive;
  }

  GerirPerfil() {
    this.router.navigate(['/gerir-perfil']);
  }
}
