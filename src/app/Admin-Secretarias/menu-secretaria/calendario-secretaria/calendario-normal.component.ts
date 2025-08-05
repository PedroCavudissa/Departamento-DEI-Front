
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';
import { CalendarioService, Evento } from '../../../services/calendario.service';
import { error } from 'jquery';
import { NotificationService } from '../../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';


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

  data = '';
  titulo = '';
  conteudo = '';
  calendarStatus = 'valido';

  eventos: Evento[] = [];

  constructor(private calendarioService: CalendarioService,private notification : NotificationService) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos() {
  this.calendarioService.listarEventos().subscribe({
    next: (dados: { content: Evento[] }) => {
      this.eventos = dados.content;
    },
    error: (err: unknown) => {
      console.error('Erro ao carregar eventos:', err);
    }
  });
}


  salvarEvento() {
    if (!this.data.trim() || !this.titulo.trim() || !this.conteudo.trim()) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    

    const novoEvento: Evento = {
      data: this.data.trim(),
      titulo: this.titulo.trim(),
      conteudo: this.conteudo.trim(),
      calendarStatus: 'VALIDO'
    };

    this.calendarioService.salvarEvento(novoEvento).subscribe({
      next: (evento: Evento) =>  {
        this.eventos.push(evento);
        this.fecharFormulario();
        this.limparCampos();
        this.exibirToast();
      },
      error: (err: unknown) => {
        if (err instanceof HttpErrorResponse) {
          console.error('Erro HTTP ao salvar evento:', err.message);
        } else {
          console.error('Erro desconhecido ao salvar evento:', err);
        }
      }
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
    this.conteudo = '';
  }

  exibirToast() {
    this.mostrarToast = true;
    setTimeout(() => {
      this.mostrarToast = false;
    }, 3000);
  }
 baixarCalendarioPDF(): void {
    this.calendarioService.baixarPDFCalendarioProvas();
  }


}
