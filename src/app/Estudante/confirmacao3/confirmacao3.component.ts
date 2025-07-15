import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmacaoService, Rupe, DadosAcademicos, Disciplina } from '../../Services/confirmacao.service';
import { LateralComponent } from '../lateral/lateral.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpErrorResponse } from '@angular/common/http';

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
///////////////////////////////////////////////////////////////////////////////////////////////////
  carregarDados(): void {
  this.confirmacaoService.getDadosAcademicos().subscribe({
    next: (data) => {
      this.dadosAcademicos = data;
      this.carregarRupe();
      this.carregarDisciplinasPorFazer(); // ✅ sem parâmetros
    },
    error: (err) => console.error('Erro ao carregar dados:', err)
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////
  carregarDisciplinasPorFazer(): void {
  this.confirmacaoService.getDisciplinasFazer().subscribe({
    next: (disciplinas) => {
      this.disciplinasPorFazer = disciplinas;
    },
    error: (err) => {
      console.error('Erro ao carregar disciplinas por fazer:', err);
      this.mensagem = 'Erro ao carregar disciplinas.';
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////
  carregarRupe(): void {
    this.confirmacaoService.getRupeDoEstudante().subscribe({
      next: (listaRupes) => {
        if (listaRupes.length > 0) {
          this.rupe = listaRupes[listaRupes.length - 1];
          this.mensagem = '';
        } else {
          this.rupe = null;
          this.rupeGeravel = true;
        }
      },
      error: (err) => {
        console.error('Erro Ao Buscar RUPE:', err);
        this.rupe = null;
        this.rupeGeravel = false;
        this.mensagem = 'Erro Ao Buscar RUPE.';
      }
    });
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////
  imprimirRupe(): void {
    const elemento = document.querySelector('.grid-dados');
    if (!elemento) {
      this.mensagem = 'Não Há Dados Para Imprimir.';
      return;
    }

 html2canvas(elemento as HTMLElement, {
  scale: 2
} as any).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`RUPE-${this.rupe?.rupeNumber || 'documento'}.pdf`);
    });
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  finalizarConfirmacao(): void {
  if (this.finalizando) return;

  const estudanteId = this.dadosAcademicos?.userDetails?.id;
  if (!estudanteId) {
    this.mensagem = 'ID do estudante não encontrado.';
    return;
  }

  // ✅ Usa disciplinaId conforme definido na interface Disciplina
  const disciplinasIds = this.disciplinasPorFazer.map(d => d.disciplinaId);

  if (disciplinasIds.length === 0) {
    this.mensagem = 'Nenhuma disciplina para confirmar.';
    return;
  }

  this.finalizando = true;

  this.confirmacaoService.finalizarConfirmacao(disciplinasIds).subscribe({
    next: () => {
      this.mensagem = 'Pedido de confirmação enviado com sucesso!';
      this.finalizando = false;
    },
    error: (error: HttpErrorResponse) => {
      console.error('❌ Erro ao confirmar disciplinas:', error);
      this.mensagem = 'Erro ao confirmar disciplinas.';
      this.finalizando = false;
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////
    confi1() {
    this.router.navigate(['/confirmacao1']);
  }

  confi3() {
    this.router.navigate(['/confirmacao3']);
  }

  confi2(): void {
    this.router.navigate(['/confirmacao2']);
  }
}
