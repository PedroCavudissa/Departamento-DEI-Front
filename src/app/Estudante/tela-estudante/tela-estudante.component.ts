// tela-estudante.component.ts
import { Component, OnInit } from '@angular/core';
import { Viestudante, ViestudanteService } from '../../Services/viestudante.service';
import { CommonModule } from '@angular/common';
import { LateralComponent } from "../lateral/lateral.component";

@Component({
  selector: 'app-tela-estudante',
  templateUrl: './tela-estudante.component.html',
  styleUrls: ['./tela-estudante.component.css'],
  imports: [CommonModule, LateralComponent,]
})
export class TelaEstudanteComponent implements OnInit {
  viestudantes: Viestudante[] = [];
  errorMessage: string | null = null;
  estudanteSelecionado: Viestudante | undefined;

  mensagem: string | undefined;

  constructor(private viestudanteService: ViestudanteService) {}
  // Método ngOnInit para inicializar o componente
 
 ngOnInit(): void {
   
    this.buscarEstudante();
  }
   buscarEstudante(): void {
    this.viestudanteService.getEstudante().subscribe({
      next: (data: Viestudante) => {
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


