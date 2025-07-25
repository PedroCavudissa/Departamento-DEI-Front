import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralComponent } from '../lateral/lateral.component';
import { CalendarioService, Evento } from '../../services/calendario.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-calendario-estudante',
  standalone: true,
  imports: [LateralComponent, CommonModule,FormsModule],
  templateUrl: './calendario-estudante.component.html',
  styleUrl: './calendario-estudante.component.css',
})
export class CalendarioEstudanteComponent implements OnInit {
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
