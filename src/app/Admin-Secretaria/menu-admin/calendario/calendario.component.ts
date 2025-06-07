import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { CalendarioService, Evento } from '../../../services/calendario.service';

@Component({
  selector: 'app-calendario',
  standalone: true,

  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent  {

  
  mostrarFormulario = false;
  
  data = '';
  titulo = '';
  tipo = '';
  link? = '';

  eventos: Evento[] = [];

  constructor(private calendarioService: CalendarioService) {}

  salvarEvento() {
    if (!this.data.trim() || !this.titulo.trim() || !this.tipo.trim()) {
      alert('Preencha todos os campos obrigatórios.');
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
      },
      error: err => console.error('Erro ao salvar evento:', err)
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  fecharFormulario() {
    this.mostrarFormulario = false;
  }

  limparCampos() {
    this.data = '';
    this.titulo = '';
    this.tipo = '';
   
    this.link = '';
  }
}
