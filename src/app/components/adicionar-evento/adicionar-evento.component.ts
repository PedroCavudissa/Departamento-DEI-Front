import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adicionar-evento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adicionar-evento.component.html',
  styleUrls: ['./adicionar-evento.component.css']
})
export class AdicionarEventoComponent {
  @Output() submitEvento = new EventEmitter<any>();
  @Output() fechar = new EventEmitter<void>();

  data: string = '';
  titulo: string = '';
  tipo: string = '';
  link?: string = '';

  salvarEvento() {
  if (!this.data.trim() || !this.titulo.trim() || !this.tipo.trim()) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const evento = {
    data: this.data.trim(),
    titulo: this.titulo.trim(),
    tipo: this.tipo.trim(),
    link: this.link?.trim() || '' 
  };

  this.submitEvento.emit(evento);
  this.limparCampos();
}

  fecharFormulario() {
    this.fechar.emit();
  }

  limparCampos() {
    this.data = '';
    this.titulo = '';
    this.tipo = '';
    this.link = '';
  }

}

