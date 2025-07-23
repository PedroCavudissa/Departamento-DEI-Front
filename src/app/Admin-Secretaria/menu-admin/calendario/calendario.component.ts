
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { CalendarioService, Evento } from '../../../Services/calendario.service';
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

  eventos: Evento[] = [];

  constructor(private calendarioService: CalendarioService,private notification : NotificationService) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.loading = true;

    this.calendarioService.listarEventos().subscribe({
      next: (dados) => {
        this.eventos = dados;
        this.loading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar eventos:', erro);
        this.loading = false;
      }
    });
  }
eventoEditando?: Evento; // Evento em edição
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
    data: this.data.trim(),
    titulo: this.titulo.trim(),
    tipo: this.tipo.trim(),
    link: this.link?.trim() || ''
  };

  this.calendarioService.salvarEvento(novoEvento).subscribe({
    next: evento => {
      this.eventos.push(evento);
      this.fecharFormulario();
      this.limparCampos();
      this.notification.success('Evento salvo com sucesso!');
    },
    error: err => console.error('Erro ao salvar evento:', err)
  });
}

editarEvento(evento: Evento) {
  this.eventoEditando = { ...evento }; // faz uma cópia para edição
  this.mostrarFormulario = true;
  this.data = evento.data;
  this.titulo = evento.titulo;
  this.tipo = evento.tipo;
  this.link = evento.link || '';
}

atualizarEvento() {
  if (!this.eventoEditando?.id) return;

  const dadosAtualizados: Partial<Evento> = {
    data: this.data.trim(),
    titulo: this.titulo.trim(),
    tipo: this.tipo.trim(),
    link: this.link?.trim() || ''
  };

  this.calendarioService.atualizarEvento(this.eventoEditando.id, dadosAtualizados).subscribe({
    next: () => {
      this.notification.success('Evento atualizado com sucesso!');
      this.fecharFormulario();
      this.limparCampos();
      this.eventoEditando = undefined;
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
  }

}

