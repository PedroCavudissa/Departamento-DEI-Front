import { Component } from '@angular/core';
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
export class Confirmacao1Component {
  disciplinasfaze: Disciplina[] = []; // <== Adicione esta linha

  constructor(
    private router: Router,
    private confirmacaoService: ConfirmacaoService
  ) {}

ngOnInit(): void {
  this.confirmacaoService.getDadosAcademicos().subscribe({
    next: (dados) => {
      const estudanteId = dados.userDetails.id;
      const ano = dados.userDetails.anoAcademico; // ← pegando o ano diretamente
      const semestre = this.getSemestre(); // ← define conforme necessário (ex: selecionável na UI ou fixo)

      this.confirmacaoService.getDisciplinasFazer(estudanteId, ano, semestre).subscribe({
        next: (disciplinas) => {
          this.disciplinasfaze = disciplinas;
        },
        error: (err) => {
          console.error('❌ Erro ao carregar disciplinas a fazer:', err);
          this.disciplinasfaze = [];
        }
      });
    },
    error: (err) => {
      console.error('❌ Erro ao obter dados acadêmicos:', err);
    }
  });
}
getSemestre(): number {
  const mes = new Date().getMonth() + 1;
  return mes <= 6 ? 1 : 2;
}
  confi2() {
    this.router.navigate(['/confirmacao2']);
  }
}