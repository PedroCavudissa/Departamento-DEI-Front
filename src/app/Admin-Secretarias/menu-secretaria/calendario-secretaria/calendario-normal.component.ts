
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';
import { CalendarioService, Evento } from '../../../Services/calendario.service';
import { error } from 'jquery';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-calendario-secretaria',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralSecretariaComponent],
  templateUrl: './calendario-normal.component.html',
  styleUrls: ['./calendario-normal.component.css'],
})



export class CalendarioNormalComponent implements OnInit {
  mostrarFormulario = false;
  mostrarToast = false;
  loading: boolean = false;

  data = '';
  titulo = '';
  tipo = '';
  link? = '';

  eventos: Evento[] = [];

  constructor(private calendarioService: CalendarioService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos() {
    this.calendarioService.obterEventos(1).subscribe({
      next: (res) => (this.eventos = res),
      error: (err) => console.error('Erro ao carregar eventos:', err)
    });
  }

  salvarEvento() {
    if (!this.data.trim() || !this.titulo.trim() || !this.tipo.trim()) {

      this.notification.error('Preencha todos os campos obrigatórios.');

  

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
        this.exibirToast();
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
  exibirToast() {
    this.mostrarToast = true;
    setTimeout(() => {
      this.mostrarToast = false;
    }, 3000);
  }
}



