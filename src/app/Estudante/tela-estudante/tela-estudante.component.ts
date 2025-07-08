// tela-estudante.component.ts
import { Component, OnInit } from '@angular/core';
import { Estudante, EstudanteService } from '../../Services/estudante.service';

import { CommonModule } from '@angular/common';
import { LateralComponent } from "../lateral/lateral.component";

@Component({
  selector: 'app-tela-estudante',
  templateUrl: './tela-estudante.component.html',
  styleUrls: ['./tela-estudante.component.css'],
  imports: [CommonModule, LateralComponent,]
})
export class TelaEstudanteComponent implements OnInit {
  estudantes: Estudante[] = [];
  errorMessage: string | null = null;
  estudanteSelecionado: Estudante | undefined;
  mensagem: string | undefined;

  constructor(private estudanteService: EstudanteService) {}
  // Método ngOnInit para inicializar o componente
 
 ngOnInit(): void {
    // Substitua '1' pelo ID real do estudante que deseja buscar
    this.buscarEstudante();
  }
   buscarEstudante(): void {
    this.estudanteService.getEstudante().subscribe({
      next: (data: Estudante) => {
        this.estudanteSelecionado = data;
        this.errorMessage = null;
      },
      error: (err: { message: string }) => {
        console.error('Erro ao buscar estudante:', err);
        this.errorMessage = err.message || 'Erro desconhecido ao buscar estudante.';
        this.estudanteSelecionado = undefined;
      }
    });


  }

}
  /*
buscarEstudantePorId(): void {
  this.estudanteService.getEstudante.subscribe({
    next: (data: Estudante | undefined) => {
      this.estudanteSelecionado = data;
      this.errorMessage = null;
    },
    error: (err: { message: string; }) => {
      console.error('Erro ao buscar estudante por ID:', err);
      this.errorMessage = err.message || 'Erro desconhecido ao buscar estudante por ID.';
      this.estudanteSelecionado = undefined;
    }
  });
} */