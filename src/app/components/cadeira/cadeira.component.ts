import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadeira',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadeira.component.html',
  styleUrls: ['./cadeira.component.css'] 
})
export class CadeiraComponent {
  anoSelecionado: number = 1;

  anosDisponiveis: number[]= [1, 2, 3, 4, 5];

  disciplinas: { id: number; nome: string; ano: number }[] = [
    { id: 1, nome: 'Análise Matemática I', ano: 1 },
    { id: 2, nome: 'Fundamentos de Programação', ano: 1 },
    { id: 3, nome: 'Álgebra Linear', ano: 2 },
    { id: 4, nome: 'Estruturas de Dados', ano: 2 },
    { id: 5, nome: 'Redes de Computadores', ano: 3 },
    { id: 6, nome: 'Comunicação de Dados', ano: 3 },
    { id: 7, nome: 'Computação Multimedia', ano: 4 },
    { id: 8, nome: 'Sistema de Segurança de informação', ano: 4 },
    { id: 9, nome: 'Projecto Final I', ano: 5 },
    { id: 10, nome: 'Projecto final II', ano: 5 }  
  ];

  get disciplinasFiltradas() {
    return this.disciplinas.filter(d => d.ano === this.anoSelecionado);
  }
}
