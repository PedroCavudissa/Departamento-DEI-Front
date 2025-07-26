
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaNotasService } from '../../services/tela-notas.service';
import { DisciplinaNota, NotaFilter, ModeloNota } from '../../models/nota.model';
import { TelaNotasFilterComponent } from './components/tela-notas-filter/tela-notas-filter.component';
import { NotaDisciplinaComponent } from "./nota-disciplina/nota-disciplina.component";
import { LateralComponent } from '../lateral/lateral.component';


@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, TelaNotasFilterComponent,LateralComponent],
  templateUrl: './tela-notas.component.html',
  styleUrls: ['./tela-notas.component.css']
})
export class TelaNotasComponent {
  disciplinas: DisciplinaNota[] = [];
  loading = false;
  error: string | null = null;
  currentYear = new Date().getFullYear();
  currentModel: ModeloNota | null = null;

  constructor(private telaNotasService: TelaNotasService) {}

  onFilterChange(filters: NotaFilter): void {
    this.currentModel = filters.modelo;
    this.loadDisciplinas(filters);
  }

  private loadDisciplinas(filters: NotaFilter): void {
    this.loading = true;
    this.error = null;
    this.disciplinas = [];

    this.telaNotasService.getNotas(filters).subscribe({
      next: (data) => {
        this.disciplinas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }

  formatNota(nota: number | null | undefined): string {
    return nota !== null && nota !== undefined ? nota.toString() : '-';
  }

  getModelFields(): string[] {
    switch (this.currentModel) {
      case 'A':
        return ['AC1', 'P1'];
      case 'B':
        return ['AC1', 'P1', 'AC2', 'P2', 'MS', 'RS'];
      case 'C':
        return ['MS', 'Exame', 'MF', 'RS'];
      case 'D':
        return ['MS', 'Recurso', 'MF', 'RS'];
      case 'E':
        return ['Exame Oral', 'MF', 'RS'];
      case 'F':
        return ['Exame Especial', 'MF', 'RS'];
      default:
        return [];
    }
  }

  getNotaValue(disciplina: DisciplinaNota, field: string): string {
    switch (field.toLowerCase()) {
      case 'ac1': return this.formatNota(disciplina.ac1);
      case 'p1': return this.formatNota(disciplina.p1);
      case 'ac2': return this.formatNota(disciplina.ac2);
      case 'p2': return this.formatNota(disciplina.p2);
      case 'ms': return this.formatNota(disciplina.ms);
      case 'rs': return disciplina.rs || '-';
      case 'exame': return this.formatNota(disciplina.exame);
      case 'mf': return this.formatNota(disciplina.mf);
      case 'recurso': return this.formatNota(disciplina.recurso);
      case 'exame oral': return this.formatNota(disciplina.exameOral);
      case 'exame especial': return this.formatNota(disciplina.exameEspecial);
      default: return '-';
    }
  }
}
