// src/app/tela-notas/components/tela-notas-filter/tela-notas-filter.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModeloNota, NotaFilter } from '../../../../models/nota.model';
import { BarralateralComponent } from "../../../../Admin-Secretaria/barralateral/barralateral.component";

@Component({
  selector: 'app-tela-notas-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './tela-notas-filter.component.html',
  styleUrls: ['./tela-notas-filter.component.css']
})
export class TelaNotasFilterComponent {
  @Output() filterChange = new EventEmitter<NotaFilter>();

  modelos: ModeloNota[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  anosLetivos: number[] = [];
  selectedModelo: ModeloNota | null = null;
  selectedAno: number | null = null;

  constructor() {
    this.generateAnosLetivos();
  }

  private generateAnosLetivos(): void {
    const currentYear = new Date().getFullYear(); // 2025
    const yearsToShow = 10; // Mostrar até 10 anos anteriores

    this.anosLetivos = Array.from({ length: yearsToShow }, (_, i) => currentYear - i);
  }

  applyFilters(): void {
    if (!this.selectedModelo) return;

    this.filterChange.emit({
      modelo: this.selectedModelo,
      anoLetivo: this.selectedAno || undefined
    });
  }
}
