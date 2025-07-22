import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmacaoService, Rupe, DadosAcademicos, Disciplina } from '../../services/confirmacao.service';
import { LateralComponent } from '../lateral/lateral.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-confirmacao3',
  standalone: true,
  imports: [CommonModule, LateralComponent],
  templateUrl: './confirmacao3.component.html',
  styleUrl: './confirmacao3.component.css'
})
export class Confirmacao3Component implements OnInit {
  rupe: Rupe | null = null;
  dadosAcademicos: DadosAcademicos | null = null;
  disciplinasPorFazer: Disciplina[] = [];
  mensagem = '';
  rupeGeravel = false;
  finalizando = false;

  constructor(
    private confirmacaoService: ConfirmacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.confirmacaoService.getDadosAcademicos().subscribe({
      next: (data: DadosAcademicos) => {
        this.dadosAcademicos = data;
        const estudanteId: number = data.userDetails.id;
        const ano: number = data.userDetails.anoAcademico;
        this.carregarRupe();
        this.carregarDisciplinasPorFazer(estudanteId, ano, 1); // semestre fixo ou dinâmico
      },
      error: (err: unknown) => console.error('Erro ao carregar dados:', err)
    });
  }

  carregarDisciplinasPorFazer(estudanteId: number, ano: number, semestre: number): void {
    this.confirmacaoService.getDisciplinasFazer(estudanteId, ano, semestre).subscribe({
      next: (disciplinas: Disciplina[]) => {
        this.disciplinasPorFazer = disciplinas;
      },
      error: (err: unknown) => {
        console.error('Erro ao carregar disciplinas por fazer:', err);
        this.mensagem = 'Erro ao carregar disciplinas.';
      }
    });
  }

  carregarRupe(): void {
    this.confirmacaoService.getRupeDoEstudante().subscribe({
      next: (listaRupes: Rupe[]) => {
        if (listaRupes.length > 0) {
          this.rupe = listaRupes[listaRupes.length - 1];
          this.mensagem = '';
        } else {
          this.rupe = null;
          this.rupeGeravel = true;
        }
      },
      error: (err: unknown) => {
        console.error('Erro Ao Buscar RUPE:', err);
        this.rupe = null;
        this.rupeGeravel = false;
        this.mensagem = 'Erro Ao Buscar RUPE.';
      }
    });
  }

  imprimirRupe(): void {
    const elemento = document.querySelector('.grid-dados');
    if (!elemento) {
      this.mensagem = 'Não Há Dados Para Imprimir.';
      return;
    }

    html2canvas(elemento as HTMLElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`RUPE-${this.rupe?.rupeNumber || 'documento'}.pdf`);
    });
  }

  finalizarConfirmacao(): void {
    if (this.finalizando) return;

    const estudanteId = this.dadosAcademicos?.userDetails?.id;
    if (!estudanteId) {
      this.mensagem = 'ID do estudante não encontrado.';
      return;
    }

    const disciplinasIds: number[] = this.disciplinasPorFazer.map(d => d.id);
    if (disciplinasIds.length === 0) {
      this.mensagem = 'Nenhuma disciplina disponível para confirmar.';
      return;
    }

    console.log('Enviando matrícula do estudante', estudanteId, 'com disciplinas:', disciplinasIds);

    this.finalizando = true;

    this.confirmacaoService.finalizarConfirmacao(estudanteId, disciplinasIds).subscribe({
      next: () => {
        this.mensagem = 'Confirmação Finalizada Com Sucesso!';
        this.finalizando = false;
      },
      error: (err: { status: number; error?: { message?: string } } | unknown) => {
        console.error('Erro Ao Finalizar Confirmação:', err);
        this.finalizando = false;

        if (typeof err === 'object' && err !== null && 'status' in err && err.status === 409) {
          this.mensagem = (err as { error?: { message?: string } }).error?.message || 'Confirmação Já Foi Realizada.';
        } else {
          this.mensagem = 'Erro Ao Finalizar Confirmação.';
        }
      }
    });
  }

  confi2(): void {
    this.router.navigate(['/confirmacao2']);
  }
}
