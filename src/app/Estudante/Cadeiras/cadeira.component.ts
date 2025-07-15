import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LateralComponent } from "../lateral/lateral.component";
import { DisciplinaService } from "../../services/disciplina.service";
// Defina a interface DisciplinaEmAtraso localmente caso não exista no service

@Component({
  selector: 'app-cadeira',
  standalone: true,
  imports: [CommonModule, FormsModule, LateralComponent],
  templateUrl: './cadeira.component.html',
  styleUrls: ['./cadeira.component.css']
})
export class CadeiraComponent  {
 /* estudanteId = 1; // Substitua pelo ID real do estudante logado
  disciplinas: DisciplinaEmAtraso[] = [];

  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.disciplinaService.getDisciplinas(this.estudanteId).subscribe({
      next: (dados) => this.disciplinas = dados.map(d => ({
        ...d,
        ano: typeof d.ano === 'number' ? d.ano
          : (typeof d.ano_academico === 'number' ? d.ano_academico
            : (d.ano_academico ? Number(d.ano_academico) : undefined)),
        semestre: d.semestre ?? '', // Garante que semestre exista
        status: d.status ?? 'desconhecido' // ou defina um valor padrão apropriado
      })),
      error: (err) => console.error('Erro ao buscar disciplinas', err)
    });
  }
  */
}
