import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component';
import { LacamentoNotasService } from '../../services/lacamento-notas.service';
import { Disciplina } from '../../services/lacamento-notas.service'; // Importa a interface correta

interface Nota {
  // Defina a estrutura das notas conforme necessário
  id?: number;
  alunoId?: number;
  valor?: number;
  // Outras propriedades
}

interface TipoPauta {
  codigo: number;
  descricao: string;
}

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
  standalone: true,
  imports: [LateralProfessorComponent, CommonModule, FormsModule],
})
export class LancamentoComponent implements OnInit {
  professorNome = '';
  disciplinas: Disciplina[] = [];
  notas: Nota[] = [];
  tipos: TipoPauta[] = [
    { codigo: 1, descricao: 'Notas Da AC1 e PF1' },
    { codigo: 2, descricao: 'Notas Da AC2 e PF2' },
    { codigo: 3, descricao: 'Notas Do Exame Epóca Normal' },
    { codigo: 4, descricao: 'Notas Do Exame Epóca De Recurso' },
    { codigo: 5, descricao: 'Notas Da Oral' }
  ];

  disciplinaSelecionadaId: number | null = null;
  tipoSelecionado: number | null = null;
  excelFile?: File;
  carregando = false;
  mensagem = '';
  erro = '';
  progressoTipos: Record<number, number> = {};

  constructor(private lacamentoNotasService: LacamentoNotasService) {}

  ngOnInit(): void {
    this.carregarProgressoDoLocalStorage();

    this.carregando = true;
    this.lacamentoNotasService.getDadosDoProfessor().subscribe({
      next: (dados: { nome: string }) => {
        this.professorNome = dados.nome;
      },
      error: () => {
        this.professorNome = '';
      }
    });

    this.lacamentoNotasService.getDisciplinasDoProfessor().subscribe({
      next: (dados: Disciplina[]) => {
        this.carregando = false;
        this.disciplinas = dados;
        if (dados.length === 0) {
          this.erro = 'Nenhuma Disciplina Disponível.';
          this.limparMensagensDepoisDeTempo();
        }
      },
      error: (err: HttpErrorResponse) => {
        this.carregando = false;
        this.erro = 'Erro ao Carregar Disciplinas.';
        console.error(err);
        this.limparMensagensDepoisDeTempo();
      }
    });
  }

  onDisciplinaChange(): void {
    this.tipoSelecionado = null;
    this.mensagem = '';
    this.erro = '';
  }

  isTipoPermitido(disciplinaId: number | null, tipoCodigo: number): boolean {
    if (!disciplinaId) return false;
    const progresso = this.progressoTipos[disciplinaId] ?? 0;
    return tipoCodigo <= progresso + 1;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input?.files?.length) return;

    this.excelFile = input.files[0];
  }

  salvar(): void {
    if (!this.tipoSelecionado || !this.disciplinaSelecionadaId) return;

    this.lacamentoNotasService.salvarNotas(
      this.disciplinaSelecionadaId,
      this.tipoSelecionado,
      this.notas
    ).subscribe({
      next: () => {
        this.mensagem = 'Notas salvas com sucesso!';
        this.limparMensagensDepoisDeTempo();
      },
      error: (err: HttpErrorResponse) => {
        this.erro = 'Erro ao salvar notas.';
        console.error(err);
        this.limparMensagensDepoisDeTempo();
      }
    });
  }

  enviarExcel(): void {
    this.mensagem = '';
    this.erro = '';

    if (this.excelFile && this.disciplinaSelecionadaId != null && this.tipoSelecionado != null) {
      this.lacamentoNotasService.importarExcel(this.excelFile, this.disciplinaSelecionadaId, this.tipoSelecionado)
        .subscribe({
          next: (notasImportadas: Nota[]) => {
            this.notas = notasImportadas;
            this.mensagem = 'Ficheiro Enviado Com Sucesso!';
            let atual = 0;
            if (this.disciplinaSelecionadaId !== null) {
              atual = this.progressoTipos[this.disciplinaSelecionadaId] ?? 0;
            }
            if (this.tipoSelecionado && this.disciplinaSelecionadaId !== null && this.tipoSelecionado > atual) {
              this.progressoTipos[this.disciplinaSelecionadaId] = this.tipoSelecionado;
              this.salvarProgressoNoLocalStorage();
            }

            this.tipoSelecionado = null;
            this.excelFile = undefined;
            this.limparMensagensDepoisDeTempo();
          },
          error: (err: HttpErrorResponse) => {
            this.erro = 'Erro ao Enviar o Ficheiro.';
            console.error(err);
            this.limparMensagensDepoisDeTempo();
          }
        });
    } else {
      this.erro = 'Selecione a Disciplina, o Modelo da Pauta, Importe o Ficheiro!';
    }
  }

  baixarModelo(): void {
    if (this.disciplinaSelecionadaId && this.tipoSelecionado != null) {
      this.lacamentoNotasService
        .baixarModeloExcel(this.disciplinaSelecionadaId, this.tipoSelecionado)
        .subscribe({
          next: (response: HttpResponse<Blob>) => {
            const blob = response.body;
            if (!blob) {
              this.erro = 'Resposta sem conteúdo.';
              return;
            }

            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'modelo_notas.xlsx';

            if (contentDisposition) {
              const utf8Match = contentDisposition.match(/filename\*=UTF-8''(.+)/);
              if (utf8Match && utf8Match[1]) {
                filename = decodeURIComponent(utf8Match[1]);
              } else {
                const simpleMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                if (simpleMatch && simpleMatch[1]) {
                  filename = simpleMatch[1];
                }
              }
            }

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erro ao baixar modelo:', err);
            this.erro = 'Erro ao baixar modelo Excel.';
            this.limparMensagensDepoisDeTempo();
          }
        });
    } else {
      this.erro = 'Selecione a Disciplina e o Modelo da Pauta para baixar.';
      this.limparMensagensDepoisDeTempo();
    }
  }

  private limparMensagensDepoisDeTempo(): void {
    setTimeout(() => {
      this.mensagem = '';
      this.erro = '';
    }, 4000);
  }

  private carregarProgressoDoLocalStorage(): void {
    const progressoSalvo = localStorage.getItem('progressoTipos');
    if (progressoSalvo) {
      this.progressoTipos = JSON.parse(progressoSalvo);
    }
  }

  private salvarProgressoNoLocalStorage(): void {
    localStorage.setItem('progressoTipos', JSON.stringify(this.progressoTipos));
  }
}
