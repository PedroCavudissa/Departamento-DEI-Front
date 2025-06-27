import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component';
import { LancamentoService, Nota } from '../../Services/lacamento-notas.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
  standalone: true,
  imports: [LateralProfessorComponent, CommonModule, FormsModule],
})
export class LancamentoComponent implements OnInit {
  mensagem = '';

  tipos = [
    { id: 1, nome: 'AC1 e PF1' },
    { id: 2, nome: 'AC2 e PF2' },
    { id: 3, nome: 'Exame' },
    { id: 4, nome: 'Recurso' },
    { id: 5, nome: 'Oral' },
    { id: 6, nome: 'Exame Especial' },
  ];

  disciplinas: { id: number; nome: string }[] = [];
  disciplinaSelecionada: number | '' = '';
  tipoSelecionado: number | '' = '';
  notas: Nota[] = [];

  constructor(@Inject(LancamentoService) private lancamentoService: LancamentoService) {}

  ngOnInit(): void {
    this.lancamentoService.listarDisciplinas().subscribe({
      next: (res) => this.disciplinas = res,
      error: (err) => console.error('Erro ao carregar disciplinas:', err)
    });
  }

  gerarExcel(): void {
    if (!this.disciplinaSelecionada) {
      alert('Selecione a disciplina.');
      return;
    }

    const disciplina = this.disciplinas.find(d => d.id === this.disciplinaSelecionada);
    const tipo = this.tipos.find(t => t.id === this.tipoSelecionado);
    const nomeDisciplina = disciplina?.nome || 'disciplina';
    const nomeTipo = tipo?.nome.replace(/\s+/g, '_') || 'tipo';

    this.lancamentoService.gerarExcel(this.disciplinaSelecionada).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `notas_${nomeDisciplina}_${nomeTipo}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erro ao gerar Excel:', err);
        alert('Erro ao gerar Excel.');
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!this.tipoSelecionado || !this.disciplinaSelecionada || !input?.files?.length) return;

    const file: File = input.files[0];

    this.lancamentoService.importarExcel(this.disciplinaSelecionada as number, this.tipoSelecionado as number, file).subscribe({
      next: (notasImportadas: Nota[]) => {
        this.notas = notasImportadas;
        alert('Arquivo importado com sucesso!');
      },
      error: (err) => alert('Erro ao importar arquivo: ' + (err.message || err)),
    });
  }

  salvar(): void {
    if (!this.tipoSelecionado || !this.disciplinaSelecionada) return;

    this.lancamentoService.salvarNotas(this.disciplinaSelecionada as number, this.notas, this.tipoSelecionado as number).subscribe({
      next: () => alert('Notas salvas com sucesso!'),
      error: (err: HttpErrorResponse) => alert('Erro ao salvar notas: ' + this.getErrorMessage(err)),
    });
  }

  publicar(): void {
    if (!this.tipoSelecionado || !this.disciplinaSelecionada) return;

    this.lancamentoService.publicarNotas(this.disciplinaSelecionada as number, this.notas, this.tipoSelecionado as number).subscribe({
      next: () => alert('Notas publicadas com sucesso!'),
      error: (err: HttpErrorResponse) => alert('Erro ao publicar notas: ' + this.getErrorMessage(err)),
    });
  }

  private getErrorMessage(err: HttpErrorResponse): string {
    return err?.message || 'Erro desconhecido';
  }

  resetar(): void {
    this.tipoSelecionado = '';
    this.disciplinaSelecionada = '';
    this.notas = [];
  }
}
