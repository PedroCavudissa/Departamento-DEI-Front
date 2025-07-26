import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AlunoPauta, MenuService, Disciplina } from '../../../services/ver-pauta-secretaria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-pauta',
  templateUrl: './ver-pauta.component.html',
  styleUrl: './ver-pauta.component.css',
  imports: [
    BarralateralComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})

export class VerPautaComponent implements OnInit {
  // Dados do formulário
  modelo: string = '';
  disciplinaSelecionada: Disciplina | null = null;
  anoLetivo!: number;
  disciplinaId!: number;

  // Listas
  modelos = ['A', 'B', 'C', 'D', 'E', 'F'];
  disciplinas: Disciplina[] = [];
  alunos: AlunoPauta[] = [];

  // Paginação
  paginaAtual: number = 0;
  totalPaginas: number = 0;
  tamanhoPagina: number = 10;

  // Mensagens de erro
  mensagemErroDisciplina: string = '';
  mensagemErroModelo: string = '';
  mensagemErroAno: string = '';

  // Flag para saber se o usuário clicou em "Buscar"
  buscaRealizada: boolean = false;

  constructor(private pautaService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.carregarDisciplinas();
  }

 disciplinaAlterada(disciplina: Disciplina | null): void {
  this.disciplinaId = disciplina ? disciplina.id : 0;
  this.tentarAtualizarPautas();
}

modeloAlterado(): void {
  this.tentarAtualizarPautas();
}

anoLetivoAlterado(): void {
  this.tentarAtualizarPautas();
}

tentarAtualizarPautas(): void {
  const anoAtual = new Date().getFullYear();
  const anoValido = this.anoLetivo && this.anoLetivo >= 1900 && this.anoLetivo <= anoAtual + 1;

  if (this.disciplinaSelecionada && this.modelo && this.disciplinaId && anoValido) {
    this.carregarPautas();
  }
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

  selecionarDisciplina(disciplina: Disciplina | null): void {
    this.disciplinaId = disciplina ? disciplina.id : 0;
  }

  carregarPautas(): void {
    // Resetar mensagens de erro
    this.mensagemErroDisciplina = '';
    this.mensagemErroModelo = '';
    this.mensagemErroAno = '';
    this.buscaRealizada = false; // Resetar antes da busca

    let camposValidos = true;

    // Validação da disciplina
    if (!this.disciplinaSelecionada || !this.disciplinaId) {
      this.mensagemErroDisciplina = 'Selecione uma disciplina.';
      camposValidos = false;
    }

    // Validação do modelo
    if (!this.modelo) {
      this.mensagemErroModelo = 'Selecione um modelo.';
      camposValidos = false;
    }

    // Validação do ano letivo
    const anoAtual = new Date().getFullYear();
    if (!this.anoLetivo || this.anoLetivo < 1900 || this.anoLetivo > anoAtual + 1) {
      this.mensagemErroAno = 'Digite um ano letivo válido (ex: 2025).';
      camposValidos = false;
    }

    // Se houver erros, não prosseguir
    if (!camposValidos) return;

    // Chamada ao serviço
    this.pautaService.listarPautas(this.modelo, this.anoLetivo, this.disciplinaId).subscribe({
      next: (data) => {
        this.alunos = data;
        this.buscaRealizada = true;
      },
      error: (erro) => {
        console.error('Erro ao buscar pautas:', erro);
        this.alunos = [];
        this.buscaRealizada = true;
      }
    });
  }

  nomeDisciplinaSelecionada(): string {
    const d = this.disciplinas.find(d => d.id === this.disciplinaId);
    return d ? d.nome : '';
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
