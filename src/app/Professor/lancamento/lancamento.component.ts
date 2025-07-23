import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component';
<<<<<<< HEAD
import { LacamentoNotasService, Disciplina, TipoPauta } from '../../services/lacamento-notas.service';
=======
import { LacamentoNotasService, Disciplina, TipoPauta } from './lacamento-notas.service';
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f


import { LacamentoNotasService, Disciplina, TipoPauta } from '../../Services/lacamento-notas.service';
import { Nota } from '../../services/tela-notas.service';
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
<<<<<<< HEAD
  notas: Nota[] = [];
=======
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
  tipos: TipoPauta[] = [
    { codigo: 1, descricao: 'Notas Da AC1 e PF1' },
    { codigo: 2, descricao: 'Notas Da AC2 e PF2' },
    { codigo: 3, descricao: 'Notas Do Exame Epóca Normal' },
    { codigo: 4, descricao: 'Notas Do Exame Epóca De Recurso' },
<<<<<<< HEAD
    { codigo: 5, descricao: 'Notas Da Oral' },
    { codigo: 6, descricao: 'Notas Do Exame Especial' }
=======
    { codigo: 5, descricao: 'Notas Da Oral' }
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
  ];

  disciplinaSelecionadaId: number | null = null;
  tipoSelecionado: number | null = null;
  excelFile?: File;
  carregando: boolean = false;
  mensagem: string = '';
  erro: string = '';
<<<<<<< HEAD
  progressoTipos: { [disciplinaId: number]: number } = {};
=======
  progressoTipos: { [disciplinaId: number]: number } = {}; // controle local
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f

  constructor(private lacamentoNotasService: LacamentoNotasService) {}

  ngOnInit(): void {
<<<<<<< HEAD
    this.carregarProgressoDoLocalStorage();

    this.carregando = true;

=======
    this.carregarProgressoDoLocalStorage(); // carregar progresso salvo

    this.carregando = true;
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
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

<<<<<<< HEAD
=======
  isTipoPermitido(disciplinaId: number | null, tipoCodigo: number): boolean {
    if (!disciplinaId) return false;
    const progresso = this.progressoTipos[disciplinaId] ?? 0;
    return tipoCodigo <= progresso + 1;
  }

>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
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
<<<<<<< HEAD
    }

    if (!input?.files?.length) return;

    const file = input.files[0];
    const disciplinaId = Number(this.disciplinaSelecionadaId);
    const tipoId = Number(this.tipoSelecionado);

    if (!disciplinaId || !tipoId) {
      alert('Selecione a disciplina e o tipo de avaliação antes de importar.');
      return;
    }

    this.lacamentoNotasService.importarExcel(file,disciplinaId, tipoId).subscribe({
      next: (notasImportadas: Nota[]) => {
        this.notas = notasImportadas;
        alert('Arquivo importado com sucesso!');
      },
      error: (err) => alert('Erro ao importar arquivo: ' + (err.message || err)),
    });
  }


  salvar(): void {
    if (!this.tipoSelecionado || !this.disciplinaSelecionadaId) return;

    this.lacamentoNotasService.salvarNotas(
      this.disciplinaSelecionadaId as number,
      this.tipoSelecionado as number,
      this.notas
    )
    ;
=======
    }
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
  }

  enviarExcel(): void {
    this.mensagem = '';
    this.erro = '';

    if (this.excelFile && this.disciplinaSelecionadaId != null && this.tipoSelecionado != null) {
<<<<<<< HEAD
      this.lacamentoNotasService.importarExcel(this.excelFile, this.disciplinaSelecionadaId, this.tipoSelecionado)
        .subscribe({
          next: () => {
            this.mensagem = 'Ficheiro Enviado Com Sucesso!';

            const atual = this.progressoTipos[this.disciplinaSelecionadaId!] ?? 0;
            if (this.tipoSelecionado! > atual) {
              this.progressoTipos[this.disciplinaSelecionadaId!] = this.tipoSelecionado!;
              this.salvarProgressoNoLocalStorage();
=======
      this.lacamentoNotasService.enviarExcel(this.excelFile, this.disciplinaSelecionadaId, this.tipoSelecionado)
        .subscribe({
          next: () => {
            this.mensagem = 'Ficheiro Enviado Com Sucesso!';
            
            const atual = this.progressoTipos[this.disciplinaSelecionadaId!] ?? 0;
            if (this.tipoSelecionado! > atual) {
              this.progressoTipos[this.disciplinaSelecionadaId!] = this.tipoSelecionado!;
              this.salvarProgressoNoLocalStorage(); // salvar no localStorage
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
            }

            this.tipoSelecionado = null;
            this.excelFile = undefined;
<<<<<<< HEAD

            const inputFile = document.getElementById('fileInput') as HTMLInputElement;
            if (inputFile) inputFile.value = '';

=======
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
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

<<<<<<< HEAD
 private getErrorMessage(err: HttpErrorResponse): string {
    return err?.error?.message || err.message || 'Erro desconhecido';
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

=======
  baixarModelo(): void {
    if (this.disciplinaSelecionadaId && this.tipoSelecionado != null) {
      this.lacamentoNotasService
        .baixarModeloExcel(this.disciplinaSelecionadaId, this.tipoSelecionado)
        .subscribe({
          next: (response) => {
            const blob = response.body!;
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'modelo_notas.xlsx';

>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
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

<<<<<<< HEAD
  limparProgresso(): void {
    this.progressoTipos = {};
    localStorage.removeItem('progressoTipos');
    this.mensagem = 'Progresso apagado com sucesso!';
    this.limparMensagensDepoisDeTempo();
  }

=======
>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
  private limparMensagensDepoisDeTempo(): void {
    setTimeout(() => {
      this.mensagem = '';
      this.erro = '';
    }, 4000);
  }
<<<<<<< HEAD
=======

>>>>>>> 46f4c6bbc9486c55f0c5325a67c6f3fb90f2a81f
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

