import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component';
import { LacamentoNotasService, Disciplina, TipoPauta, PautaEstudante } from '../../services/lacamento-notas.service';

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
  carregando = false;
  mensagem = '';
  erro = '';
  tiposDesabilitados: number[] = [];
  tipoComPendencias: number[] = [];
  tiposComEstudantesSemNotaMesmoLançado: number[] = [];

  constructor(private lacamentoNotasService: LacamentoNotasService) {}

  ngOnInit(): void {
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
    this.tiposDesabilitados = [];
    this.tipoComPendencias = [];
    this.tiposComEstudantesSemNotaMesmoLançado = [];

    if (!this.disciplinaSelecionadaId) return;

    this.lacamentoNotasService.buscarPautaPorDisciplinaId(this.disciplinaSelecionadaId).subscribe({
      next: (pautas: PautaEstudante[]) => {
        if (pautas.length === 0) return;

        const todosTemNota = (campo: keyof PautaEstudante): boolean =>
          pautas.every(estudante => estudante[campo] !== null && estudante[campo] !== undefined);

        const algumFaltandoNota = (campo: keyof PautaEstudante): boolean =>
          pautas.some(estudante => estudante[campo] === null || estudante[campo] === undefined);

        const processarTipo = (tipo: number, campos: (keyof PautaEstudante)[]) => {
          const todosTem = campos.every(c => todosTemNota(c));
          const algumFalta = campos.some(c => algumFaltandoNota(c));
          const temAlgumPreenchido = pautas.some(est => campos.some(c => est[c] !== null && est[c] !== undefined));

          if (todosTem) {
            this.tiposDesabilitados.push(tipo);
          } else if (algumFalta && temAlgumPreenchido) {
            this.tiposComEstudantesSemNotaMesmoLançado.push(tipo);
          } else {
            this.tipoComPendencias.push(tipo);
          }
        };

        processarTipo(1, ['ac1', 'p1']);
        processarTipo(2, ['ac2', 'p2']);
        processarTipo(3, ['exame']);
        processarTipo(4, ['exameRecurso']);
        processarTipo(5, ['exameOral']);
        processarTipo(6, ['exameEspecial']);
      },
      error: (err) => {
        console.error('Erro ao verificar pautas:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        this.excelFile = file;
        this.mensagem = '✅ Ficheiro Selecionado Com Sucesso!';
        this.erro = '';
      } else {
        this.excelFile = undefined;
        this.mensagem = '';
        this.erro = 'Extensão Inválida. Só são aceites ficheiros Excel (.xlsx ou .xls).';
      }
      this.limparMensagensDepoisDeTempo();
    }
  }

  enviarExcel(): void {
    this.mensagem = '';
    this.erro = '';

    const erros: string[] = [];

    if (!this.disciplinaSelecionadaId) erros.push('📌 Selecione a Disciplina');
    if (!this.tipoSelecionado) erros.push('📌 Selecione o Modelo da Pauta');
    if (!this.excelFile) erros.push('📌 Importe o Ficheiro Excel');

    if (erros.length > 0) {
      this.erro = erros.join(' | ');
      this.limparMensagensDepoisDeTempo();
      return;
    }

    this.lacamentoNotasService.enviarExcel(
      this.excelFile!,
      this.disciplinaSelecionadaId!,
      this.tipoSelecionado!
    ).subscribe({
      next: () => {
        this.mensagem = '✅ Ficheiro Enviado Com Sucesso!';
        this.tipoSelecionado = null;
        this.disciplinaSelecionadaId = null;
        this.excelFile = undefined;
        const inputFile = document.getElementById('fileInput') as HTMLInputElement;
        if (inputFile) inputFile.value = '';
        this.limparMensagensDepoisDeTempo();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400 && typeof err.error === 'string') {
          this.erro = `❌ ${err.error}`;
        } else {
          this.erro = '❌ Erro ao Enviar o Ficheiro.';
        }
        console.error(err);
        this.limparMensagensDepoisDeTempo();
      }
    });
  }

  baixarModelo(): void {
  this.erro = '';
  this.mensagem = '';

  const erros = [];
  if (!this.disciplinaSelecionadaId) erros.push('a Disciplina');
  if (!this.tipoSelecionado) erros.push('o Modelo da Pauta');

  if (erros.length > 0) {
    this.erro = `Por favor, selecione ${erros.join(' e ')} para baixar o modelo.`;
    this.limparMensagensDepoisDeTempo();
    return;
  }

  if (!this.verificarTipoAnteriorEnviado(this.tipoSelecionado!)) {
    const tipoAnterior = this.tipoSelecionado! - 1;
    const nomeModeloAnterior = this.tipos.find(t => t.codigo === tipoAnterior)?.descricao || `Modelo ${tipoAnterior}`;
    this.erro = `⚠️ Você deve enviar primeiro o modelo anterior: "${nomeModeloAnterior}".`;
    this.limparMensagensDepoisDeTempo();
    return;
  }

  this.lacamentoNotasService.baixarModeloExcel(this.disciplinaSelecionadaId!, this.tipoSelecionado!).subscribe({
    next: (response) => {
      const blob = response.body!;
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'modelo_notas.xlsx';

      if (contentDisposition) {
        const utf8Match = contentDisposition.match(/filename\*\=UTF-8''(.+)/);
        if (utf8Match) filename = decodeURIComponent(utf8Match[1]);
        else {
          const simpleMatch = contentDisposition.match(/filename="?([^"]+)"?/);
          if (simpleMatch) filename = simpleMatch[1];
        }
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);

      this.mensagem = 'Modelo baixado com sucesso!';
      this.tipoSelecionado = null;
      this.disciplinaSelecionadaId = null;
      this.tiposDesabilitados = [];
      this.limparMensagensDepoisDeTempo();
    },
    error: (err) => {
      console.error('Erro ao baixar modelo:', err);
      this.erro = 'Erro ao baixar modelo Excel.';
      this.limparMensagensDepoisDeTempo();
    }
  });
}
  verificarTipoAnteriorEnviado(tipoAtual: number): boolean {
    if (tipoAtual === 1) return true;
    const tipoAnterior = tipoAtual - 1;
    return this.tiposDesabilitados.includes(tipoAnterior) || this.tiposComEstudantesSemNotaMesmoLançado.includes(tipoAnterior);
  }

  private limparMensagensDepoisDeTempo(): void {
    setTimeout(() => {
      this.mensagem = '';
      this.erro = '';
    }, 8000);
  }
}
