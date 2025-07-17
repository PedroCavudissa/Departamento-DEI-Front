import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlunoPauta, Disciplina, MenuService } from '../../../services/ver-pauta-secretaria.service';

@Component({
  selector: 'app-ver-pauta',
  imports: [BarralateralComponent,CommonModule,FormsModule],
  templateUrl: './ver-pauta.component.html',
  styleUrl: './ver-pauta.component.css'
})
export class VerPautaComponent implements OnInit {
  modelo = 'A';
  anoLetivo!: number;
  disciplinaId!: number;

  modelos = ['A', 'B', 'C', 'D', 'E'];
  disciplinas: Disciplina[] = [];
  alunos: AlunoPauta[] = [];

  paginaAtual: number = 0;
  totalPaginas: number = 0;
  tamanhoPagina: number = 10;

  constructor(private pautaService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.carregarDisciplinas();
  }

  carregarDisciplinas(pagina: number = 0): void {
    this.pautaService.getDisciplinas(pagina, this.tamanhoPagina).subscribe({
      next: (res) => {
        this.disciplinas = res.content;
        this.paginaAtual = res.number;
        this.totalPaginas = res.totalPages;
      },
      error: (err) => {
        console.error('Erro ao carregar disciplinas:', err);
        this.disciplinas = [];
      }
    });
  }

  carregarPautas(): void {
    if (!this.modelo || !this.anoLetivo || !this.disciplinaId) return;

    this.pautaService.listarPautas(this.modelo, this.anoLetivo, this.disciplinaId).subscribe({
      next: (data) => {
        this.alunos = data;
      },
      error: (erro) => {
        console.error('Erro ao buscar pautas:', erro);
        this.alunos = [];
      }
    });
  }

  nomeDisciplinaSelecionada(): string {
    const d = this.disciplinas.find(d => d.id === this.disciplinaId);
    return d ? d.nome: '';
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.carregarDisciplinas(this.paginaAtual - 1);
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual + 1 < this.totalPaginas) {
      this.carregarDisciplinas(this.paginaAtual + 1);
    }
  }
}