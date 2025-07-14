import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../../../Services/disciplina.service';
import { CommonModule } from '@angular/common';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { FormsModule } from '@angular/forms';

export interface DisciplinaEmAtraso {
  sigla: string;
  ano_academico: string | number;
  precedencia: string;
  semestre: string;
  nome: string;
  id?: string;
  status?: string; // Adicionei status pois você está usando no mapeamento
}

const estudanteId = 1;

@Component({
  selector: 'app-detalhes-cadeiras',
  standalone: true,
  imports: [CommonModule, BarralateralComponent, FormsModule],
  templateUrl: './detalhes-cadeiras.component.html',
  styleUrl: './detalhes-cadeiras.component.css',
})
export class DetalhesCadeirasComponent implements OnInit {
  disciplinas: DisciplinaEmAtraso[] = [];
  errorMessage: string | null = null;

  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.carregarDisciplinas(); // Mudei o nome do método para refletir o que ele realmente faz
  }

  carregarDisciplinas(): void {
    this.disciplinaService.getDisciplinas(estudanteId).subscribe({
      next: (data: any[]) => {
        this.disciplinas = data.map((disciplina: any) => ({
          sigla: disciplina.sigla || disciplina.codigo || '',
          ano_academico: disciplina.ano_academico || disciplina.ano || '',
          precedencia: disciplina.precedencia || disciplina.requisitos || '',
          semestre: disciplina.semestre || '',
          nome: disciplina.nome || disciplina.designacao || '',
          id: disciplina.id || '',
          status: disciplina.status || 'indefinido'
        }));
        this.errorMessage = null;
      },
      error: (err: Error) => {
        console.error('Erro detalhado:', err);
        this.errorMessage = this.getErrorMessage(err);
        this.disciplinas = [];
      }
    });
  }

  private getErrorMessage(err: Error): string {
    if (err.message.includes('HTML em vez de dados JSON')) {
      return 'O servidor está retornando uma página HTML. Verifique:';
    } else if (err.message.includes('JSON válido')) {
      return 'Os dados recebidos não estão no formato correto.';
    }
    return err.message;
  }
}
