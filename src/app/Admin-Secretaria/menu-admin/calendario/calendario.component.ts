import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD:src/app/components/calendario/calendario.component.ts
=======
import { BarralateralComponent } from "../../barralateral/barralateral.component";
>>>>>>> Dev:src/app/Admin-Secretaria/menu-admin/calendario/calendario.component.ts

interface Evento {
  data: string;
  titulo: string;
  tipo: string;
  link?: string;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
<<<<<<< HEAD:src/app/components/calendario/calendario.component.ts
  imports: [CommonModule, FormsModule],
=======
  imports: [CommonModule, FormsModule, BarralateralComponent],
>>>>>>> Dev:src/app/Admin-Secretaria/menu-admin/calendario/calendario.component.ts
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  mostrarFormulario = false;

  // Dados do novo evento 
  data= '';
  titulo= '';
  tipo ='';
  link?= '';

  // Dados do novo evento 
  data: string = '';
  titulo: string = '';
  tipo: string = '';
  link?: string = '';

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
      return;
    }

    const novoEvento: Evento = {
      data: this.data.trim(),
      titulo: this.titulo.trim(),
      tipo: this.tipo.trim(),
      link: this.link?.trim() || ''
    };

    this.eventos.push(novoEvento);
    this.mostrarFormulario = false;
    this.limparCampos();
<<<<<<< HEAD:src/app/components/calendario/calendario.component.ts
  }

  limparCampos() {
    this.data = '';
    this.titulo = '';
    this.tipo = '';
    this.link = '';
=======
>>>>>>> Dev:src/app/Admin-Secretaria/menu-admin/calendario/calendario.component.ts
  }

  limparCampos() {
    this.data = '';
    this.titulo = '';
    this.tipo = '';
    this.link = '';
  }
}