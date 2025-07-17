import { Component, OnInit } from '@angular/core';
import { LateralProfessorComponent } from "../lateral-professor/lateral-professor.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarioService, Evento } from '../../services/calendario.service';


@Component({
  selector: 'app-calendario-professor',
  imports: [LateralProfessorComponent,FormsModule,CommonModule],
  templateUrl: './calendario-professor.component.html',
  styleUrl: './calendario-professor.component.css'
})
export class CalendarioProfessorComponent implements OnInit {
  eventos: Evento[] = [];

  constructor(private calendarioService: CalendarioService) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.calendarioService.listarEventos().subscribe({
      next: (dados) => (this.eventos = dados),
      error: (erro) => console.error('Erro ao carregar eventos:', erro)
    });
  }
}
