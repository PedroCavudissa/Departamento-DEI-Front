import { Component, OnInit } from '@angular/core';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Estudante, EstudanteService } from '../../../services/estudante.service';

@Component({
  selector: 'app-detalhes-estudantes',
  standalone: true,
  imports: [BarralateralComponent, FormsModule, CommonModule],
  templateUrl: './detalhes-estudantes.component.html',
  styleUrls: ['./detalhes-estudantes.component.css'],
})
export class DetalhesEstudantesComponent implements OnInit {
  estudantes: Estudante[] = [];
  anoSelecionado: string = '';
  textoBusca: string = '';
  estudanteSelecionado: Estudante | null = null;
  modoEdicao: boolean = false;

  constructor(private estudanteService: EstudanteService) {}

  ngOnInit(): void {
    this.carregarEstudantes();
  }

  carregarEstudantes(): void {
    const ano = Number(this.anoSelecionado);
    if (!ano) {
      this.estudantes = [];
      return;
    }

    this.estudanteService.getEstudantesPorAno(ano).subscribe({
      next: (dados) => {
        this.estudantes = dados;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar estudantes:', err);
      }
    });
  }

  get estudantesFiltrados(): Estudante[] {
    return this.estudantes.filter(d => {
      const buscaTexto = this.textoBusca.toLowerCase();
      const nomeMatch = d.nome.toLowerCase().includes(buscaTexto);
      const anoMatch = this.anoSelecionado === '' || d.anoAcademico === parseInt(this.anoSelecionado, 10);

      return nomeMatch && anoMatch;
    });
  }

  verDetalhes(estudante: Estudante) {
    this.estudanteSelecionado = { ...estudante }; // clone para edição
    this.modoEdicao = false;
  }

  editar(estudante: Estudante) {
    this.estudanteSelecionado = { ...estudante }; // clone para evitar edição direta
    this.modoEdicao = true;
  }

  fecharModal() {
    this.estudanteSelecionado = null;
    this.modoEdicao = false;
  }

  salvarEdicao() {
    if (!this.estudanteSelecionado) return;

    this.estudanteService.updateEstudante(this.estudanteSelecionado).subscribe({
      next: (atualizado) => {
        // Atualiza na lista local
        const idx = this.estudantes.findIndex(e => e.id === atualizado.id);
        if (idx !== -1) this.estudantes[idx] = atualizado;

        this.fecharModal();
        console.log('✅ Estudante atualizado com sucesso!');
      },
      error: (err) => {
        console.error('❌ Erro ao atualizar estudante:', err);
      }
    });
  }
}
