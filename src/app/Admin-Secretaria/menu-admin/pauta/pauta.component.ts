import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PautaService, Disciplina, Estudante } from '../../../Services/pauta.service';

@Component({
  selector: 'app-pauta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pauta.component.html',
  styleUrls: ['./pauta.component.css']
})
export class PautaComponent implements OnInit {
  disciplinas: Disciplina[] = [];
  disciplinaSelecionada!: Disciplina;
  estudantes: Estudante[] = [];

  constructor(private pautaService: PautaService) {}

  ngOnInit(): void {
    this.pautaService.getDisciplinas().subscribe({
      next: (res) => {
        this.disciplinas = res;
        if (this.disciplinas.length > 0) {
          this.disciplinaSelecionada = this.disciplinas[0];
          this.carregarEstudantes();
        }
      },
      error: (err) => console.error('Erro ao buscar disciplinas:', err)
    });
  }

  carregarEstudantes(): void {
    if (!this.disciplinaSelecionada?.disciplinaId) return;
    this.pautaService.getEstudantesComNotas(this.disciplinaSelecionada.disciplinaId).subscribe({
      next: (res) => this.estudantes = res,
      error: (err) => console.error('Erro ao buscar estudantes:', err)
    });
  }

  aprovar(): void {
    this.pautaService.avaliarPauta(this.disciplinaSelecionada.disciplinaId, true).subscribe({
      next: () => {
        alert('✅ Pauta aprovada!');
        this.carregarEstudantes(); // Atualiza a lista após aprovação
      },
      error: () => alert('❌ Erro ao aprovar pauta.')
    });
  }

  rejeitar(): void {
    const motivo = prompt('Informe o motivo da rejeição:');
    if (!motivo) return;

    this.pautaService.avaliarPauta(this.disciplinaSelecionada.disciplinaId, false, motivo).subscribe({
      next: () => {
        alert('✅ Pauta rejeitada!');
        this.carregarEstudantes(); // Atualiza a lista após rejeição
      },
      error: () => alert('❌ Erro ao rejeitar pauta.')
    });
  }

  onDisciplinaChange(): void {
    this.carregarEstudantes();
  }
}
