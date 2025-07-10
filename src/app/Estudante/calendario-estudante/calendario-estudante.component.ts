import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralComponent } from '../lateral/lateral.component';
import { CalendarioService, Evento } from '../../services/calendario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendario-estudante',
  standalone: true,
  // ⚠️  se usar Angular ≥17, "imports" é correto; em versões mais antigas use "imports: [...]" em @NgModule
  imports: [LateralComponent, CommonModule, FormsModule],
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
    this.calendarioService.obterEventos().subscribe({
      next: (dados: Evento[]) => (this.eventos = dados),
      error: (erro: any) => console.error('Erro ao carregar eventos:', erro),
    });
  }
}
