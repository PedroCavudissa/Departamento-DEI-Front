import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from "../../../../Departamento-DEI-Front-Chat-CORRIGIDO/src/app/barralateral/barralateral.component";

@Component({
  selector: 'app-tela-notas',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './tela-notas.component.html',
  styleUrls: ['./tela-notas.component.css']
})
export class TelaNotasComponent {
  filtroDisciplina = '';
  filtroSemestre = '';

  disciplinas = [
    'Análise Matemática I',
    'FTI',
    'Fundamento de Programação',
    'Inglês Técnico 1',
    'Algoritmos',
    'Inglês Técnico 2',
    'Análise Matemática II'
  ];

  semestres = ['1º', '2º'];

  notas = [
    { cadeira: 'Análise Matemática I', semestre: '1º', ac1: 15, ac2: 14, p1: 16, p2: 17, ms: 15, exame: 16 },
    { cadeira: 'FTI', semestre: '1º', ac1: 13, ac2: 12, p1: 14, p2: 13, ms: 13, exame: 14 },
    { cadeira: 'Fundamento de Programação', semestre: '1º', ac1: 18, ac2: 19, p1: 17, p2: 18, ms: 18, exame: 19 },
    { cadeira: 'Inglês Técnico 1', semestre: '1º', ac1: 14, ac2: 13, p1: 15, p2: 14, ms: 14, exame: 15 },
    { cadeira: 'Algoritmos', semestre: '2º', ac1: 16, ac2: 16, p1: 16, p2: 16, ms: 16, exame: 16 },
    { cadeira: 'FTI', semestre: '2º', ac1: 12, ac2: 13, p1: 14, p2: 12, ms: 13, exame: 14 },
    { cadeira: 'Inglês Técnico 2', semestre: '2º', ac1: 15, ac2: 14, p1: 15, p2: 16, ms: 15, exame: 15 },
    { cadeira: 'Análise Matemática II', semestre: '2º', ac1: 13, ac2: 12, p1: 14, p2: 15, ms: 13, exame: 14 }
  ];

  get notasFiltradas() {
    return this.notas.filter(n =>
      (this.filtroDisciplina === '' || n.cadeira === this.filtroDisciplina) &&
      (this.filtroSemestre === '' || n.semestre === this.filtroSemestre)
    );
  }

  limparFiltros() {
    this.filtroDisciplina = '';
    this.filtroSemestre = '';
    this.scrollTabela();
  }

  scrollTabela() {
    setTimeout(() => {
      document.getElementById('tabela')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}
