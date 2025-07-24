import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component';
import { LacamentoNotasService, Disciplina, TipoPauta } from '../../services/lacamento-notas.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
  standalone: true,
  imports: [LateralProfessorComponent, CommonModule, FormsModule],
})
export class LancamentoComponent implements OnInit {
  professorNome: string = '';
  disciplinas: Disciplina[] = [];
  tipos: TipoPauta[] = [
    { codigo: 1, descricao: 'Notas Da AC1 e PF1' },
    { codigo: 2, descricao: 'Notas Da AC2 e PF2' },
    { codigo: 3, descricao: 'Notas Do Exame Epóca Normal' },
    { codigo: 4, descricao: 'Notas Do Exame Epóca De Recurso' },
    { codigo: 5, descricao: 'Notas Da Oral' },
    { codigo: 6, descricao: 'Notas Do Exame Especial' }
  ];

  disciplinaSelecionadaId: number | null = null;
  tipoSelecionado: number | null = null;
  excelFile?: File;
  carregando: boolean = false;
  mensagem: string = '';
  erro: string = '';
  progressoTipos: { [disciplinaId: number]: number } = {};

  constructor(private lacamentoNotasService: LacamentoNotasService) {}

  ngOnInit(): void {
    this.carregarProgressoDoLocalStorage();

    this.carregando = true;

    this.lacamentoNotasService.getDadosDoProfessor().subscribe({
      next: (dados) => this.professorNome = dados.nome,
      error: () => this.professorNome = ''
    });

    this.lacamentoNotasService.getDisciplinasDoProfessor().subscribe({
      next: (dados) => {
        this.carregando = false;
        this.disciplinas = dados;
        if (dados.length === 0) {
          this.erro = 'Nenhuma Disciplina Disponível.';
          this.limparMensagensDepoisDeTempo();
        }
      },
      error: (err: HttpErrorResponse) => {
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        this.excelFile = file;
        this.mensagem = 'Ficheiro Selecionado Com Sucesso!';
        this.erro = '';
        this.limparMensagensDepoisDeTempo();
      } else {
        this.excelFile = undefined;
        this.mensagem = '';
        this.erro = 'Extensão Inválida. Só são Aceites Ficheiros Excel (.xlsx ou .xls).';
        this.limparMensagensDepoisDeTempo();
      }
    }
  }

  enviarExcel(): void {
    this.mensagem = '';
    this.erro = '';

    if (this.excelFile && this.disciplinaSelecionadaId != null && this.tipoSelecionado != null) {
      this.lacamentoNotasService.enviarExcel(this.excelFile, this.disciplinaSelecionadaId, this.tipoSelecionado)
        .subscribe({
          next: () => {
            this.mensagem = 'Ficheiro Enviado Com Sucesso!';

            const atual = this.progressoTipos[this.disciplinaSelecionadaId!] ?? 0;
            if (this.tipoSelecionado! > atual) {
              this.progressoTipos[this.disciplinaSelecionadaId!] = this.tipoSelecionado!;
              this.salvarProgressoNoLocalStorage();
            }

            this.tipoSelecionado = null;
            this.excelFile = undefined;

            const inputFile = document.getElementById('fileInput') as HTMLInputElement;
            if (inputFile) inputFile.value = '';

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
          next: (response) => {
            const blob = response.body!;
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'modelo_notas.xlsx';

            if (contentDisposition) {
              const utf8Match = contentDisposition.match(/filename\*\=UTF-8''(.+)/);
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
          error: (err) => {
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

  limparProgresso(): void {
    this.progressoTipos = {};
    localStorage.removeItem('progressoTipos');
    this.mensagem = 'Progresso apagado com sucesso!';
    this.limparMensagensDepoisDeTempo();
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
