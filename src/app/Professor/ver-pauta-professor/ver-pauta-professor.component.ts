import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LacamentoNotasService, Disciplina, PautaEstudante, PedidoEdicaoNota} from '../../services/lacamento-notas.service';
import { LateralProfessorComponent } from "../lateral-professor/lateral-professor.component";

// Tipos adicionais
type CampoNota =
  'ac1' | 'ac2' | 'p1' | 'p2' | 'ms' |
  'exame' | 'exameRecurso' | 'exameOral' | 'exameEspecial';

type PautaEstudanteEditavel = PautaEstudante & { editando?: boolean };

@Component({
  selector: 'app-ver-pauta-professor',
  standalone: true,
  templateUrl: './ver-pauta-professor.component.html',
  styleUrls: ['./ver-pauta-professor.component.css'],
  imports: [FormsModule, CommonModule, LateralProfessorComponent]
})
export class VerPautaProfessorComponent implements OnInit {
  disciplinas: Disciplina[] = [];
  disciplinaSelecionadaNome!: string;
  carregando = false;
  pauta: PautaEstudanteEditavel[] = [];
  tipoSelecionado: number | null = null;
  mensagem: string = ''

  // Campos que podem ser editados
  camposNota: CampoNota[] = [
    'ac1', 'ac2', 'p1', 'p2', 'ms',
    'exame', 'exameRecurso', 'exameOral', 'exameEspecial'
  ];
  
  campoTemNota(valor: number | null): boolean {
  return valor !== null && valor !== undefined;
}

 mostrarModal = false;

  pedidosPendentes: PedidoEdicaoNota[] = [];
  pedidosAprovados: PedidoEdicaoNota[] = [];
  pedidosRejeitados: PedidoEdicaoNota[] = [];
  mostrarMensagem = false;
  mensagemTexto = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';
  abaSelecionada: 'pendentes' | 'aprovados' | 'rejeitados' = 'pendentes';

  constructor(private notasService: LacamentoNotasService) {}

exibirMensagem(mensagem: string, tipo: 'sucesso' | 'erro' = 'sucesso') {
  this.mensagemTexto = mensagem;
  this.tipoMensagem = tipo;
  this.mostrarMensagem = true;
    }

abrirModal(): void {
  const disciplinaSelecionada = this.disciplinas.find(d => d.nome === this.disciplinaSelecionadaNome);
   if (!disciplinaSelecionada) {
  this.exibirMensagem('Disciplina inválida.', 'erro');
  return;
}

  const disciplinaId = disciplinaSelecionada.disciplinaId;
  this.mostrarModal = true;

  this.notasService.getPedidosPendentes(disciplinaId).subscribe({
    next: (res) => this.pedidosPendentes = res,
    error: () => alert('Erro ao buscar pedidos pendentes.')
  });

  this.notasService.getPedidosAprovados(disciplinaId).subscribe({
    next: (res) => this.pedidosAprovados = res,
    error: () => alert('Erro ao buscar pedidos aprovados.')
  });

  this.notasService.getPedidosRejeitados(disciplinaId).subscribe({
    next: (res) => this.pedidosRejeitados = res,
    error: () => alert('Erro ao buscar pedidos rejeitados.')
  });
}

fecharModal(): void {
  this.mostrarModal = false;
}


  ngOnInit(): void {
    this.notasService.getDisciplinasDoProfessor().subscribe(dados => {
      this.disciplinas = dados;
    });
  }

  visualizarPauta(): void {
    if (!this.disciplinaSelecionadaNome) return;
    this.carregando = true;

    this.notasService.buscarPautaPorDisciplinaNome(this.disciplinaSelecionadaNome)
      .subscribe({
        next: (dados) => {
          this.pauta = dados.map(est => ({ ...est, editando: false }));
          this.carregando = false;
        },
        error: () => {
          alert('Erro ao buscar a pauta.');
          this.carregando = false;
        }
      });
  }

  editarLinha(index: number): void {
    this.pauta[index].editando = true;
  }
  campoEmEdicao: string | null = null;

 salvarLinha(index: number): void {
  const confirmacao = confirm("Tem certeza que deseja enviar o pedido de edição de nota?");
  if (!confirmacao) {
    this.pauta[index].editando = false;
    return;
  }

  const estudante = this.pauta[index];
  estudante.editando = false;

  const payload: Partial<PautaEstudante> = {};
  this.camposNota.forEach(campo => {
    // Ignorar 'ms' no payload
    if (campo !== 'ms') {
      payload[campo] = estudante[campo];
    }
  });

  this.notasService.atualizarNotas(estudante.id, payload).subscribe({
    next: () => alert('Pedido para edição de nota enviado com sucesso!'),
    error: () => alert('Erro ao enviar o pedido.')
  });
}
}

