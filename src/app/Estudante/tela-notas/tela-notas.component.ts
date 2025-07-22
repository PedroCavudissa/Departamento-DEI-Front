<<<<<<< HEAD
// src/app/tela-notas/tela-notas.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaNotasService } from '../../services/tela-notas.service';
import { DisciplinaNota, NotaFilter, ModeloNota } from '../../models/nota.model';
import { TelaNotasFilterComponent } from './components/tela-notas-filter/tela-notas-filter.component';
import { NotaDisciplinaComponent } from "./nota-disciplina/nota-disciplina.component";
=======
// src/app/Estudante/tela-notas/tela-notas.component.ts

import {
  Component,
  inject,
  OnInit,
  signal,
  effect,
  DestroyRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TelaNotasService,
  Nota,
  Disciplina
} from '../../services/tela-notas.service';

import { lastValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LateralComponent } from '../lateral/lateral.component';
>>>>>>> origin

@Component({
  selector: 'app-notas',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, TelaNotasFilterComponent, NotaDisciplinaComponent],
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
=======
  imports: [CommonModule, FormsModule,LateralComponent ],
  templateUrl: './tela-notas.component.html',
  styleUrls: ['./tela-notas.component.css']
})
export class TelaNotasComponent implements OnInit {
  private readonly notasService = inject(TelaNotasService);
  private readonly destroyRef = inject(DestroyRef);

  disciplina = signal(''); // disciplina selecionada (nome string)
  modelo = signal('A');
  anoLetivo = signal(new Date().getFullYear());
  resultadoNota = signal<Nota | null>(null);
  notas = signal<Nota[]>([]);
  disciplinas = signal<Disciplina[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  disciplinasCarregadas = signal(false);

  constructor() {
    effect(() => {
      if (
        this.disciplinas().length === 0 &&
        !this.isLoading() &&
        this.disciplinasCarregadas()
      ) {
        this.errorMessage.set('Nenhuma disciplina disponível. Tente recarregar.');
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.carregarDisciplinas();
  }

  async carregarDisciplinas(): Promise<void> {
    if (this.disciplinasCarregadas()) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const disciplinas = await lastValueFrom(
        this.notasService.getDisciplinas().pipe(
          takeUntilDestroyed(this.destroyRef)
        )
      );
      this.disciplinas.set(disciplinas);
      this.disciplinasCarregadas.set(true);
    } catch (error) {
      this.handleError(error, 'Erro ao carregar disciplinas');
      this.disciplinasCarregadas.set(false);
    } finally {
      this.isLoading.set(false);
    }
  }

  async buscarNota(): Promise<void> {
    if (!this.validarCampos(true)) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const nota = await lastValueFrom(
        this.notasService
          .buscarNotaPorDisciplina(
            this.disciplina(),
            this.anoLetivo(),
            this.modelo()
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
      );
      this.resultadoNota.set(nota);
    } catch (error) {
      this.handleError(error, 'Erro ao buscar nota');
    } finally {
      this.isLoading.set(false);
    }
  }

  async listarNotas(): Promise<void> {
    if (!this.validarCampos(false)) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const notas = await lastValueFrom(
        this.notasService
          .listarTodasNotas(this.anoLetivo(), this.modelo())
          .pipe(takeUntilDestroyed(this.destroyRef))
      );
      this.notas.set(notas);
    } catch (error) {
      this.handleError(error, 'Erro ao listar notas');
    } finally {
      this.isLoading.set(false);
    }
  }

  private validarCampos(verificarDisciplina: boolean): boolean {
    this.errorMessage.set(null);

    if (verificarDisciplina && !this.disciplina()) {
      this.errorMessage.set('Selecione uma disciplina!');
      return false;
    }

    if (!this.anoLetivo()) {
      this.errorMessage.set('Informe o ano letivo!');
      return false;
    }

    return true;
  }

  private handleError(error: unknown, defaultMessage: string): void {
    console.error('Erro detalhado:', error);
    this.errorMessage.set(
      error instanceof Error ? error.message : defaultMessage
    );
  }
>>>>>>> origin
}
