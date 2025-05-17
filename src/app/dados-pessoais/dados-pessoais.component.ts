import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LateralProfessorComponent } from "../Professor/lateral-professor/lateral-professor.component";

@Component({
  selector: 'app-dados-pessoais',
  imports: [LateralProfessorComponent],
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.css'
})
export class DadosPessoaisComponent {
  constructor(private router: Router) {}

altesenha() {
  this.router.navigate(['/alterar-senha']);
}
}
