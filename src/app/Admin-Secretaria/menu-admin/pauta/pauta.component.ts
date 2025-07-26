import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PautaService, Disciplina, Estudante } from '../../../services/pauta.service';

@Component({
  selector: 'app-pauta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pauta.component.html',
  styleUrls: ['./pauta.component.css']
})
export class PautaComponent implements OnInit {
  disciplinas: Disciplina[] = [];
  disciplinaSelecionada!: Disciplina;
  estudantes: Estudante[] = [];

  //controle do modal
    mostrarModalOk = false;
    mostrarModalConfirmacao = false;
    mostrarModalRejeicao = false;
    tituloModal = '';
    mensagemModal = '';
    motivoRejeicao = '';
    tipoAcao: 'aprovar' | 'rejeitar' | null = null;
  
  constructor(private pautaService: PautaService) {}

  ngOnInit(): void {
    this.pautaService.getDisciplinas().subscribe({
      next: (res) => {
        this.disciplinas = res;
        if (this.disciplinas.length > 0) {
          this.disciplinaSelecionada = this.disciplinas[0];
          this.carregarEstudantes();
        }
      },
      error: (err) => console.error('Erro ao buscar disciplinas:', err)
    });
  }

  carregarEstudantes(): void {
    if (!this.disciplinaSelecionada?.disciplinaId) return;
    this.pautaService.getEstudantesComNotas(this.disciplinaSelecionada.disciplinaId).subscribe({
      next: (res) => this.estudantes = res,
      error: (err) => console.error('Erro ao buscar estudantes:', err)
    });
  }

  fecharModalOk(): void {
  this.mostrarModalOk = false;
}


  aprovar(): void {
    if (!this.disciplinaSelecionada?.disciplinaId) {
      this.tituloModal = 'Atenção';
      this.mensagemModal = 'Por favor, selecione uma disciplina antes de aprovar.';
      this.mostrarModalOk = true;
      return;
    }

    this.tituloModal = 'Confirmar Aprovação';
    this.mensagemModal = 'Tem certeza que deseja aprovar a edição desta pauta?';
    this.tipoAcao = 'aprovar';
    this.mostrarModalConfirmacao = true;
  }

 rejeitar(): void {
    if (!this.disciplinaSelecionada?.disciplinaId) {
      this.tituloModal = 'Atenção';
      this.mensagemModal = 'Por favor, selecione uma disciplina antes de rejeitar.';
      this.mostrarModalOk = true;
      return;
    }

    this.mostrarModalRejeicao = true;
  }

  confirmarAcao(): void {
    if (this.tipoAcao === 'aprovar') {
      this.pautaService.avaliarPauta(this.disciplinaSelecionada.disciplinaId, true).subscribe({
        next: () => {
          this.tituloModal = 'Sucesso';
          this.mensagemModal = '✅ Edição de Pauta Aprovada!';
          this.mostrarModalOk = true;
          this.carregarEstudantes();
        },
        error: () => {
          this.tituloModal = 'Erro';
          this.mensagemModal = '❌ Erro ao aprovar pauta.';
          this.mostrarModalOk = true;
        }
      });
    }

    this.mostrarModalConfirmacao = false;
    this.tipoAcao = null;
  }

  confirmarRejeicao(): void {
    if (!this.motivoRejeicao.trim()) return;

    this.pautaService.avaliarPauta(this.disciplinaSelecionada.disciplinaId, false, this.motivoRejeicao).subscribe({
      next: () => {
        this.tituloModal = 'Sucesso';
        this.mensagemModal = '✅ Edição de Pauta Rejeitada!';
        this.mostrarModalOk = true;
        this.carregarEstudantes();
      },
      error: () => {
        this.tituloModal = 'Erro';
        this.mensagemModal = '❌ Erro ao rejeitar pauta.';
        this.mostrarModalOk = true;
      }
    });

    this.mostrarModalRejeicao = false;
    this.motivoRejeicao = '';
  }

  cancelarAcao(): void {
    this.mostrarModalConfirmacao = false;
    this.tipoAcao = null;
  }

  cancelarRejeicao(): void {
    this.mostrarModalRejeicao = false;
    this.motivoRejeicao = '';
  }

  onDisciplinaChange(): void {
    this.carregarEstudantes();
  }
}
