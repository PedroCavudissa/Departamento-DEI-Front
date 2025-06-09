// tela-estudante.component.ts
import { Component, OnInit } from '@angular/core';
import { EstudanteService } from '../../services/estudante.service';
import { Estudante } from '../../interface/estudante.interface';
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

  constructor(private estudanteService: EstudanteService) {}
  // Método ngOnInit para inicializar o componente
  ngOnInit(): void {
    // Substitua '1' pelo ID real do estudante que deseja buscar
    this.buscarEstudantePorId(1);
  }


  buscarEstudantePorId(id: number): void {
  this.estudanteService.getEstudanteById(id).subscribe({
    next: (data) => {
      this.estudanteSelecionado = data;
      this.errorMessage = null;
    },
    error: (err) => {
      console.error('Erro ao buscar estudante por ID:', err);
      this.errorMessage = err.message || 'Erro desconhecido ao buscar estudante por ID.';
      this.estudanteSelecionado = undefined;
    }
  });
}


/*
  ngOnInit(): void {
    this.carregarEstudantes();
  }

  carregarEstudantes(): void {
    this.estudanteService.getEstudantes().subscribe({
      next: (data) => {
        this.estudantes = data;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Erro detalhado:', err);
        this.errorMessage = this.getErrorMessage(err);
        this.estudantes = [];
      }
    });
  }

  private getErrorMessage(err: Error): string {
    if (err.message.includes('HTML em vez de dados JSON')) {
      return 'O servidor está retornando uma página HTML. Verifique:';
    } else if (err.message.includes('JSON válido')) {
      return 'Os dados recebidos não estão no formato correto.';
    }
    return err.message;
    } */
  
  }
    

