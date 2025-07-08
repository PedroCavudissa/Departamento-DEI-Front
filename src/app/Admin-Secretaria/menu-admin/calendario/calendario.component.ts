<<<<<<< HEAD
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from "../../barralateral/barralateral.component";

interface Evento {
  data: string;
  titulo: string;
  tipo: string;
  link?: string;
}
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { CalendarioService, Evento } from '../../../Services/calendario.service';

>>>>>>> Dev

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
<<<<<<< HEAD
export class CalendarioComponent {
  mostrarFormulario = false;

  // Dados do novo evento 
  data= '';
  titulo= '';
  tipo ='';
  link?= '';

  eventos: Evento[] = [
    {
      data: '20-03-2025',
      titulo: 'Abertura do Semestre',
      tipo: 'Acadêmico',
      link: 'https://exemplo.com/evento1'
    },
    {
      data: '20-07-2025',
      titulo: 'Lançamento das Pautas',
      tipo: 'Acadêmico',
      link: 'https://exemplo.com/evento2'
    }
  ];

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
fecharFormulario() {
  this.mostrarFormulario = false;
}

  salvarEvento() {
    if (!this.data.trim() || !this.titulo.trim() || !this.tipo.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
=======
export class CalendarioComponent implements OnInit {
  mostrarFormulario = false;
  mostrarToast = false;

  data = '';
  titulo = '';
  tipo = '';
  link? = '';

  eventos: Evento[] = [];

  constructor(private calendarioService: CalendarioService) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos() {
    this.calendarioService.obterEventos().subscribe({
      next: (res) => (this.eventos = res),
      error: (err) => console.error('Erro ao carregar eventos:', err)
    });
  }

  salvarEvento() {
    if (!this.data.trim() || !this.titulo.trim() || !this.tipo.trim()) {
      alert('Preencha todos os campos obrigatórios.');
>>>>>>> Dev
      return;
    }

    const novoEvento: Evento = {
      data: this.data.trim(),
      titulo: this.titulo.trim(),
      tipo: this.tipo.trim(),
      link: this.link?.trim() || ''
    };

<<<<<<< HEAD
    this.eventos.push(novoEvento);
    this.mostrarFormulario = false;
    this.limparCampos();
=======
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
>>>>>>> Dev
  }

  limparCampos() {
    this.data = '';
    this.titulo = '';
    this.tipo = '';
    this.link = '';
  }
<<<<<<< HEAD
}
=======

  exibirToast() {
    this.mostrarToast = true;
    setTimeout(() => {
      this.mostrarToast = false;
    }, 3000);
  }

}
>>>>>>> Dev
