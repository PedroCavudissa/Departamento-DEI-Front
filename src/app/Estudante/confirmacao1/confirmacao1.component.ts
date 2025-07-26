import { Component ,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LateralComponent } from "../lateral/lateral.component";
import { ConfirmacaoService, DadosAcademicos, Disciplina } from '../../services/confirmacao.service'; // <== Adicione 'Disciplina'

@Component({
  selector: 'app-confirmacao1',
  imports: [CommonModule, LateralComponent],
  templateUrl: './confirmacao1.component.html',
  styleUrl: './confirmacao1.component.css'
})
export class Confirmacao1Component implements OnInit {
  disciplinasfaze: Disciplina[] = []; // 
  disciplinasInscritas: Disciplina[] = [];
  mostrarModal = false;
   mensagem: string = '';


  constructor(
    private router: Router,
    private confirmacaoService: ConfirmacaoService
  ) {}

ngOnInit(): void {
  this.confirmacaoService.getDadosAcademicos().subscribe({
    next: (dados) => {
      const estudanteId = dados.userDetails.id;
      const ano = dados.userDetails.anoAcademico;
      const semestre = this.getSemestre(); // Certifica-te que essa função retorna 1 ou 2

      if (!semestre) {
        console.error('⚠️ Semestre inválido.');
        this.mensagem = 'Semestre inválido.';
        return;
      }

      this.confirmacaoService.getDisciplinasFazer().subscribe({
        next: (disciplinas) => {
          this.disciplinasfaze = disciplinas;
        },
        error: (err) => {
          console.error('❌ Erro Ao Carregar Disciplinas a Fazer:', err);
          this.mensagem = 'Erro ao carregar disciplinas.';
          this.disciplinasfaze = [];
        }
      });
    },
    error: (err) => {
      console.error('❌ Erro Ao Obter Dados Acadêmicos:', err);
      this.mensagem = 'Erro ao carregar dados do estudante.';
    }
  });
}

getSemestre(): number {
  const mes = new Date().getMonth() + 1;
  return mes <= 6 ? 1 : 2;
}

abrirModal(): void {
  this.confirmacaoService.getDisciplinasInscritas().subscribe({
    next: (disciplinas) => {
      console.log('Disciplinas inscritas recebidas:', disciplinas);
      this.disciplinasInscritas = disciplinas;
      this.mostrarModal = true;
    },
    error: (err) => {
      console.error('Erro ao buscar disciplinas inscritas:', err);
      this.disciplinasInscritas = [];
    }
  });
}

fecharModal(): void {
  this.mostrarModal = false;
}

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
