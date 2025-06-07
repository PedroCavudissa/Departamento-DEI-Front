import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LateralComponent } from "../lateral/lateral.component";
import { DisciplinaService, DisciplinaEmAtraso } from '../../services/disciplina.service';

@Component({
  selector: 'app-cadeira',
  standalone: true,
  imports: [CommonModule, FormsModule, LateralComponent],
  templateUrl: './cadeira.component.html',
  styleUrls: ['./cadeira.component.css']
})
export class CadeiraComponent implements OnInit {
  anoSelecionado = 1;
  semestreSelecionado = 1; 
  estudanteId = 1;

  anosDisponiveis: number[] = [1, 2, 3, 4, 5];

  disciplinas: DisciplinaEmAtraso[] = [];

  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.disciplinaService.getDisciplinas(this.estudanteId).subscribe({
      next: (dados) => this.disciplinas = dados,
      error: (err) => console.error('Erro ao buscar disciplinas', err)
    });
  }

  get disciplinasFiltradas(): DisciplinaEmAtraso[] {
    return this.disciplinas.filter(d =>
      d.ano === this.anoSelecionado && d.semestre === this.semestreSelecionado
    );
  }
}
