import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LateralComponent } from "../lateral/lateral.component";
import { ConfirmacaoService, DadosAcademicos, Disciplina } from '../../services/confirmacao.service'; // importa a interface Disciplina

@Component({
  selector: 'app-confirmacao2',
  standalone: true,
  imports: [CommonModule, LateralComponent],
  templateUrl: './confirmacao2.component.html',
  styleUrl: './confirmacao2.component.css'
})
export class Confirmacao2Component implements OnInit {
  dadosAcademicos!: DadosAcademicos & { confirmacao: string }; // alterado: antes era String[]
  disciplinasAtrasadas: string[] = [];
  mensagem: string = '';
  erro: string = '';
  loading = true;
 disciplinasfaze: Disciplina[] = [];

  constructor(
    private router: Router,
    private confirmacaoService: ConfirmacaoService
  ) {}


  private limparMensagensDepoisDeTempo(): void {
    setTimeout(() => {
      this.mensagem = '';
      this.erro = '';
    }, 4000); // 4 segundos
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  
ngOnInit(): void {
  this.confirmacaoService.getDadosAcademicos().subscribe({
    next: (estudante) => {
      this.dadosAcademicos = {
        ...estudante,
        confirmacao: `${estudante.userDetails.anoAcademico || 1}º Ano ${this.getSemestre()}º Semestre`
      };
      this.loading = false;

      // ✅ Agora sem parâmetros
      this.confirmacaoService.getDisciplinasFazer().subscribe({
        next: (disciplinas) => {
          this.disciplinasfaze = disciplinas;
        },
        error: () => {
          this.erro = 'Erro ao carregar disciplinas do próximo semestre';
          this.limparMensagensDepoisDeTempo();
          this.disciplinasfaze = [];
        }
      });
    },
    error: () => {
      this.erro = 'Erro ao carregar dados acadêmicos';
      this.loading = false;
      this.limparMensagensDepoisDeTempo();
    }
  });

  this.confirmacaoService.getDisciplinasAtrasadas().subscribe({
    next: (disciplinas) => {
      this.disciplinasAtrasadas = disciplinas;
    },
    error: () => {
      this.erro = 'Erro ao carregar disciplinas em atraso';
      this.disciplinasAtrasadas = [];
      this.limparMensagensDepoisDeTempo();
    }
  });
}
  getSemestre(): number {
    const mes = new Date().getMonth() + 1;
    return mes <= 6 ? 1 : 2;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
    confi2() {
    this.router.navigate(['/confirmacao2']);
  }

  
  confi1() {
    this.router.navigate(['/confirmacao1']);
  }

  confi3() {
    this.router.navigate(['/confirmacao3']);
  }

}
