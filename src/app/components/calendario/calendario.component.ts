import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarEventoComponent } from '../adicionar-evento/adicionar-evento.component';

interface Evento {
  data: string;
  titulo: string;
  tipo: string;
  link?: string;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, AdicionarEventoComponent],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  mostrarFormulario: boolean = false;

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

  adicionarEvento(novoEvento: Evento) {
    this.eventos.push(novoEvento);
    this.mostrarFormulario = false;
  }
}
