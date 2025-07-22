
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { CalendarioService, Evento } from '../../../services/calendario.service';



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']

})
export class CalendarioComponent implements OnInit {
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
