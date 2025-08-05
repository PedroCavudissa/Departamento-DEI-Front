import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { CalendarioService, Evento } from '../../../services/calendario.service';
import { NotificationService } from '../../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  erro: boolean = false;
  data = '';
  titulo = '';
  conteudo = '';
  eventos: Evento[] = [];
  carregando = true;

  constructor(
    private calendarioService: CalendarioService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos() {
    this.carregando = true;
    this.erro = false;
    
    this.calendarioService.obterEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos || [];
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar eventos', err);
        this.erro = true;
        this.carregando = false;
        this.notification.error('Erro ao carregar eventos. Tente novamente.');
      }
    });
  }

  salvarEvento() {
    if (!this.data.trim() || !this.titulo.trim() || !this.conteudo.trim()) {
      this.notification.error('Preencha todos os campos obrigatórios.');
      return;
    }

    const novoEvento: Evento = {
      data: this.data.trim(),
      titulo: this.titulo.trim(),
      conteudo: this.conteudo.trim(),
      calendarStatus: 'VALIDO'
    };

    this.calendarioService.salvarEvento(novoEvento).subscribe({
      next: (evento: Evento) => {
        this.eventos.push(evento);
        this.fecharFormulario();
        this.limparCampos();
        this.notification.success('Evento salvo com sucesso!');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao salvar evento:', err);
        this.notification.error('Erro ao salvar evento. Tente novamente.');
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
