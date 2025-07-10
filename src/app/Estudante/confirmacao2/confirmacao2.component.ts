import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LateralComponent } from "../lateral/lateral.component";


@Component({
  selector: 'app-confirmacao2',
  imports: [CommonModule, LateralComponent],
  templateUrl: './confirmacao2.component.html',
  styleUrl: './confirmacao2.component.css'
})
export class Confirmacao2Component {
  constructor(private router: Router) {}
  
dadosAcademicos = {
  nome: 'Pedro José Cavudissa',
  contacto: 'xxxxxxx',
  email: 'xxxxxxx',
  numeroEstudante: 'xxxxxx',
  bi: 'xxxxxxxx',
  confirmacao: '1º Ano 2º Semestre'
};

disciplinasfaze = [
  { nome: 'FTI' },
  { nome: 'Arquitetura I' },
  { nome: 'Inglês Técnico 2' },
  { nome: 'Algoritmos' },
  { nome: 'AM2' }
];

disciplinasAtrasadas = [
  { nome: 'Fundamentos de Programação' }
];

confi1() {
  this.router.navigate(['/confirmacao1']);
}
confi3() {
  this.router.navigate(['/confirmacao3']);
}
}