import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { CalendarioService, Evento } from '../../../services/calendario.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  mostrarFormulario = false;
  mostrarToast = false;
  loading: boolean = false;

  data = '';
  titulo = '';
  tipo = '';
  link? = '';
  conteudo: string = '';

  usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  nomeFuncionario: string = this.usuario.nome;

  eventos: Evento[] = [];
  eventoEditando?: Evento;

  constructor(
    private calendarioService: CalendarioService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.loading = true;
    this.calendarioService.listarEventos().subscribe({
      next: (dados) => {
        console.log('DADOS RECEBIDOS:', dados);
        this.eventos = Array.isArray(dados) ? dados : [];
        this.loading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar eventos:', erro);
        this.loading = false;
      }
    });
  }

  /** Converte data de dd/mm/aaaa para yyyy-mm-dd */
  private formatarDataParaISO(dataBr: string): string {
    const partes = dataBr.split('/');
    if (partes.length !== 3) return '';
    const [dia, mes, ano] = partes;
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }

  salvarEvento() {
    if (!this.data.trim() || !this.titulo.trim() || !this.tipo.trim()) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    if (this.eventoEditando) {
      this.atualizarEvento();
      return;
    }

    const novoEvento: Evento = {
      data: this.formatarDataParaISO(this.data),
      titulo: this.titulo.trim(),
      tipo: this.tipo.trim(),
      link: this.link?.trim() || '',
      conteudo: this.conteudo?.trim() || '',
      calendarStatus: 'VALIDO',
      nomeFuncionario: this.nomeFuncionario || '',
    };

    this.calendarioService.salvarEvento(novoEvento).subscribe({
      next: (res) => {
        this.notification.success('Evento salvo com sucesso!');
        console.log('Evento salvo com sucesso', res);
        this.fecharFormulario();
        this.limparCampos();
        this.carregarEventos();
      },
      error: (err) => {
        console.error('Erro ao salvar evento:', err);
        if (err.error) {
          console.error('Detalhes do erro:', JSON.stringify(err.error));
        }
      }
    });
  }

  editarEvento(evento: Evento) {
    this.eventoEditando = { ...evento };
    this.mostrarFormulario = true;
    this.data = evento.data;
    this.titulo = evento.titulo;
    this.tipo = evento.tipo ?? '';
    this.link = evento.link || '';
    this.conteudo = evento.conteudo || '';
  }

  atualizarEvento() {
    if (!this.eventoEditando?.id) return;

    const dadosAtualizados: Partial<Evento> = {
      data: this.formatarDataParaISO(this.data),
      titulo: this.titulo.trim(),
      tipo: this.tipo.trim(),
      link: this.link?.trim() || '',
      conteudo: this.conteudo?.trim() || ''
    };

    this.calendarioService.atualizarEvento(this.eventoEditando.id, dadosAtualizados).subscribe({
      next: () => {
        this.notification.success('Evento atualizado com sucesso!');
        this.fecharFormulario();
        this.limparCampos();
        this.eventoEditando = undefined;
        this.carregarEventos();
      },
      error: err => console.error('Erro ao atualizar evento:', err)
    });
  }

  removerEvento(evento: Evento) {
    if (confirm(`Tem certeza que deseja remover o evento: "${evento.titulo}"?`)) {
      this.calendarioService.removerEvento(evento.id!).subscribe({
        next: () => {
          this.notification.success('Evento removido com sucesso!');
          this.eventos = this.eventos.filter(e => e.id !== evento.id);
        },
        error: err => console.error('Erro ao remover evento:', err)
      });
    }
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  fecharFormulario() {
    this.mostrarFormulario = false;
    this.eventoEditando = undefined;
  }

  limparCampos() {
    this.data = '';
    this.titulo = '';
    this.tipo = '';
    this.link = '';
    this.conteudo = '';
  }
}
