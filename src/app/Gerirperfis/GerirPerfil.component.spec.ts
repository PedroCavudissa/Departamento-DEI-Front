import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerir-prfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './GerirPerfil.component.html',
  styleUrls: ['./GerirPerfil.component.css']
})
export class GestaoAcessosComponent {
redefinirSenha: any;
sidebarVisible: any;

}
