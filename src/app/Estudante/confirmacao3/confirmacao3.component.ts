import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmacaoService, Rupe, DadosAcademicos } from '../confirmacao2/confirmacao.service';
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
  mensagem = '';
  rupeGeravel = false;


  constructor(
    private confirmacaoService: ConfirmacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  imprimirRupe(): void {
  const elemento = document.querySelector('.grid-dados'); // ou outro seletor mais específico
  if (!elemento) {
    this.mensagem = 'Não Há Dados Para Imprimir.';
    return;
  }

  html2canvas(elemento as HTMLElement, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
    pdf.save(`RUPE-${this.rupe?.rupeNumber || 'documento'}.pdf`);
  });
}

  carregarDados(): void {
  this.confirmacaoService.getDadosAcademicos().subscribe({
    next: (data) => {
      this.dadosAcademicos = data;
      this.carregarRupe(); // ✅ Aqui deve chamar
    },
    error: (err) => console.error('Erro ao carregar dados:', err)
  });
}
 carregarRupe(): void {
  const studentId = this.dadosAcademicos?.userDetails?.id;

  if (!studentId) {
    this.mensagem = 'ID do estudante não encontrado.';
    return;
  }

  this.confirmacaoService.getRupeDoEstudante().subscribe({
    next: (listaRupes) => {
      if (listaRupes.length > 0) {

        // Pega o mais recente (supondo que o último seja o mais novo)
        this.rupe = listaRupes[listaRupes.length - 1];;
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

finalizarConfirmacao(): void {
  if (!this.rupe || (this.rupe.status !== 'PAGO' && this.rupe.status !== 'PAID')) {
    this.mensagem = 'Só é Possível Finalizar se o RUPE Estiver PAGO.';
    return;
  }

  const estudanteId = this.dadosAcademicos?.userDetails?.id;
  if (!estudanteId) {
    this.mensagem = 'ID do estudante não encontrado.';
    return;
  }

  const payload = {
    estado: this.rupe.status === 'PAID' ? 'PAGO' : this.rupe.status,
    estudanteId: estudanteId
  };

  console.log('Enviando payload:', payload); // 👈 debug útil

  this.confirmacaoService.finalizarConfirmacao(payload).subscribe({
    next: () => this.mensagem = 'Confirmação Finalizada Com Sucesso!',
    error: (err) => {
      console.error('Erro Ao Finalizar Confirmação:', err);
      console.warn('Resposta do backend:', err.error); // 👈 isso mostra no console
      if (err.status === 409) {
        this.mensagem = err.error?.message || 'Confirmação Já Foi Realizada.';
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
