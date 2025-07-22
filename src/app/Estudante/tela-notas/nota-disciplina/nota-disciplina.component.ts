import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotaDisciplinaService } from '../../../services/nota-disciplina.service';
import {
  ModeloNota,
  NotaCampo,
  NotaDisciplinaRequest,
  NotaDisciplinaResponse,
  NotaDisciplinaBody
} from '../../../models/nota-disciplina.model';

@Component({
  selector: 'app-nota-disciplina',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nota-disciplina.component.html',
  styleUrls: ['./nota-disciplina.component.css']
})
export class NotaDisciplinaComponent {
  disciplinaInput = '';
  modeloSelecionado: ModeloNota = 'A';
  anoSelecionado?: number;

  response?: NotaDisciplinaBody;
  camposVisiveis: NotaCampo[] = [];
  errorMessage?: string;
  loading = false;

  anosDisponiveis: number[] = this.gerarUltimosAnos();

  constructor(private service: NotaDisciplinaService) {}

  buscarNota(): void {
    if (!this.disciplinaInput.trim()) {
      this.errorMessage = 'Informe o nome da disciplina';
      return;
    }

    this.loading = true;
    this.errorMessage = undefined;
    this.response = undefined;
    this.camposVisiveis = [];

    const request: NotaDisciplinaRequest = {
      disciplina: this.disciplinaInput.trim(),
      modelo: this.modeloSelecionado,
      anoLetivo: this.anoSelecionado
    };

    this.service.getNotaPorDisciplina(request).subscribe({
      next: (res: NotaDisciplinaResponse) => {
        this.loading = false;

        // Caso o backend retorne string (ex: mensagem de erro no body como string)
        if (typeof res.body === 'string') {
          this.errorMessage = res.body;
          return;
        }

        const body: NotaDisciplinaBody = res.body;

        // Se a API envia um campo 'mensagem' no body com erro (403)
        if (body.mensagem) {
          this.errorMessage = body.mensagem;
          return;
        }

        const campos = this.getCamposPorModelo(this.modeloSelecionado);
        const todasNotasNulas = campos.every(
          campo => body[campo] === null || body[campo] === undefined
        );

        if (todasNotasNulas) {
          this.errorMessage = 'Nenhuma nota foi lançada ainda para este modelo.';
          return;
        }

        this.response = body;
        this.camposVisiveis = campos;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Erro ao buscar a nota da disciplina.';
      }
    });
  }

  private gerarUltimosAnos(): number[] {
    const anoAtual = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => anoAtual - i);
  }

  getNomeCampo(campo: NotaCampo): string {
    const nomes: Record<NotaCampo, string> = {
      ac1: 'AC1',
      p1: 'P1',
      ac2: 'AC2',
      p2: 'P2',
      ms: 'Média Semestral',
      exame: 'Exame',
      recurso: 'Recurso',
      exameOral: 'Exame Oral',
      exameEspecial: 'Exame Especial',
      mf: 'Média Final',
      rs: 'Resultado'
    };
    return nomes[campo];
  }

  getValorCampo(campo: NotaCampo): string {
    if (!this.response) return '-';
    const valor = this.response[campo];

    if (campo === 'rs') return valor ? valor.toString() : '-';
    return valor !== null && valor !== undefined ? valor.toString() : '-';
  }

  private getCamposPorModelo(modelo: ModeloNota): NotaCampo[] {
    switch (modelo) {
      case 'A': return ['ac1', 'p1'];
      case 'B': return ['ac1', 'p1', 'ac2', 'p2', 'ms', 'rs'];
      case 'C': return ['ms', 'exame', 'mf', 'rs'];
      case 'D': return ['ms', 'recurso', 'mf', 'rs'];
      case 'E': return ['exameOral', 'mf', 'rs'];
      case 'F': return ['exameEspecial', 'mf', 'rs'];
      default: return [];
    }
  }
}
