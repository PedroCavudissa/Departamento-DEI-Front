import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LateralComponent } from "../lateral/lateral.component";
import { DisciplinaService, Disciplina } from "../../Services/disciplina.service";

@Component({
  selector: 'app-cadeira',
  standalone: true,
  imports: [CommonModule, FormsModule, LateralComponent],
  templateUrl: './cadeira.component.html',
  styleUrls: ['./cadeira.component.css']
})
export class CadeiraComponent implements OnInit {
  estudanteId = 1;
  disciplinas: Disciplina[] = [];

  anoSelecionado: string = '';
  anosDisponiveis: string[] = [];

  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (dados: Disciplina[]) => {
        this.disciplinas = dados.filter(d => d.id === this.estudanteId);
        this.anosDisponiveis = [...new Set(this.disciplinas.map(d => d.ano_academico))];
      },
      error: (err) => console.error('Erro ao buscar disciplinas', err)
    });
  }

  get disciplinasFiltradas(): Disciplina[] {
    if (!this.anoSelecionado) return this.disciplinas;
    return this.disciplinas.filter(d => d.ano_academico === this.anoSelecionado);
  }
}