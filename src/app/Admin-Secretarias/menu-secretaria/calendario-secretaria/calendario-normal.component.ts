<<<<<<< HEAD
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';

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
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';
import { CalendarioService, Evento } from '../../../Services/calendario.service';


>>>>>>> Dev

@Component({
  selector: 'app-calendario-secretaria',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralSecretariaComponent],
  templateUrl: './calendario-normal.component.html',
  styleUrls: ['./calendario-normal.component.css'],
})
<<<<<<< HEAD
export class CalendarioNormalComponent {
  mostrarFormulario = false;

  // Dados do novo evento
=======
export class CalendarioNormalComponent implements OnInit {
  mostrarFormulario = false;
  mostrarToast = false;

>>>>>>> Dev
  data = '';
  titulo = '';
  tipo = '';
  link? = '';

<<<<<<< HEAD
  eventos: Evento[] = [
    {
      data: '20-03-2025',
      titulo: 'Abertura do Semestre',
      tipo: 'Acadêmico',
      link: 'https://exemplo.com/evento1',
    },
    {
      data: '20-07-2025',
      titulo: 'Lançamento das Pautas',
      tipo: 'Acadêmico',
      link: 'https://exemplo.com/evento2',
    },
  ];

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  fecharFormulario() {
    this.mostrarFormulario = false;
=======
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
>>>>>>> Dev
  }

  salvarEvento() {
    if (!this.data.trim() || !this.titulo.trim() || !this.tipo.trim()) {
<<<<<<< HEAD
      alert('Por favor, preencha todos os campos obrigatórios.');
=======
      alert('Preencha todos os campos obrigatórios.');
>>>>>>> Dev
      return;
    }

    const novoEvento: Evento = {
      data: this.data.trim(),
      titulo: this.titulo.trim(),
      tipo: this.tipo.trim(),
<<<<<<< HEAD
      link: this.link?.trim() || '',
    };

    this.eventos.push(novoEvento);
    this.mostrarFormulario = false;
    this.limparCampos();
=======
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
