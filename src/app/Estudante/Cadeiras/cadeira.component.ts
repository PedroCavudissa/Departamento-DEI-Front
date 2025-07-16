// src/app/components/cadeira/cadeira.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LateralComponent } from "../lateral/lateral.component";
import {  CadeirasService, DisciplinaEmAtraso } from "../../services/cadeiras.service";

@Component({
  selector: 'app-cadeira',
  standalone: true,
  imports: [CommonModule, FormsModule, LateralComponent],
  templateUrl: './cadeira.component.html',
  styleUrls: ['./cadeira.component.css']
})
export class CadeiraComponent implements OnInit {
  disciplinas: DisciplinaEmAtraso[] = [];

  constructor(private cadeirasService: CadeirasService) {}

  ngOnInit(): void {
    this.cadeirasService.getDisciplinasEmAtraso().subscribe({
      next: (dados) => {
        this.disciplinas = dados.map(d => ({
          ...d,
          ano_academico: typeof d.ano_academico === 'string' ? Number(d.ano_academico) : d.ano_academico,
          semestre: d.semestre ?? '',
          status: d.status ?? 'desconhecido'
        }));
      },
      error: (err) => {
        console.error('Erro ao buscar disciplinas em atraso:', err);
      }
    });
  }
}
