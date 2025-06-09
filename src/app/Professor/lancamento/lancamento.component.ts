import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component';
import { LancamentoService ,Nota} from '../../Services/lacamento-notas.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
  standalone: true,
  imports: [LateralProfessorComponent, CommonModule, FormsModule],
})
export class LancamentoComponent {
  tipos = [
    { id: 1, nome: 'AC1 e PF1' },
    { id: 2, nome: 'AC2 e PF2' },
    { id: 3, nome: 'Exame' },
    { id: 4, nome: 'Recurso' },
    { id: 5, nome: 'Oral' },
    { id: 6, nome: 'Exame Especial' },
  ];

  tipoSelecionado: number | '' = '';
  notas: Nota[] = [];

  constructor(@Inject(LancamentoService) private lancamentoService: LancamentoService) {}

  gerarExcel(): void {
    if (!this.tipoSelecionado) return;

    this.lancamentoService.gerarExcel(this.tipoSelecionado).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `notas_${this.tipoSelecionado}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err: HttpErrorResponse) => alert('Erro ao gerar Excel: ' + this.getErrorMessage(err)),
    });
  }

  onFileSelected(event: Event): void {


const input = event.target as HTMLInputElement | null;

if (!this.tipoSelecionado || !input?.files?.length) {
  return;
}

const file: File = input.files[0];

this.lancamentoService.importarExcel(this.tipoSelecionado as number, file).subscribe({
  next: (notasImportadas: Nota[]) => {
    this.notas = notasImportadas;
    alert('Arquivo importado com sucesso!');
  },
  error: (err) => alert('Erro ao importar arquivo: ' + (err.message || err)),
});

    
  }
  salvar(): void {
    if (!this.tipoSelecionado) return;

    this.lancamentoService.salvarNotas(this.notas, this.tipoSelecionado).subscribe({
      next: () => alert('Notas salvas com sucesso!'),
      error: (err: HttpErrorResponse) => alert('Erro ao salvar notas: ' + this.getErrorMessage(err)),
    });
  }

  publicar(): void {
    if (!this.tipoSelecionado) return;

    this.lancamentoService.publicarNotas(this.notas, this.tipoSelecionado).subscribe({
      next: () => alert('Notas publicadas com sucesso!'),
      error: (err: HttpErrorResponse) => alert('Erro ao publicar notas: ' + this.getErrorMessage(err)),
    });
  }

  private getErrorMessage(err: HttpErrorResponse): string {
    return err?.message || 'Erro desconhecido';
  }
}