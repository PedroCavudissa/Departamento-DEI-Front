
import { Component, OnInit } from '@angular/core';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';
import {  DisciplinaEmAtraso, DisciplinaService } from '../../../Services/disciplina.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const estudanteId = 1;
@Component({
  selector: 'app-detalhes-cadeiras-secretaria',
  imports: [BarralateralSecretariaComponent,FormsModule,CommonModule],
  templateUrl: './detalhes-cadeiras-secretaria.component.html',
  styleUrls: ['./detalhes-cadeiras-secretaria.component.css'],
})
export class DetalhesCadeirasSecretariaComponent implements OnInit {

  disciplinas: DisciplinaEmAtraso[] = [];
  errorMessage: string | null = null;
  

  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.carregarEstudantes();
  }

  carregarEstudantes(): void {
    this.disciplinaService.getDisciplinas(estudanteId)
.subscribe({
      next: (data) => {
        this.disciplinas = data;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Erro detalhado:', err);
        this.errorMessage = this.getErrorMessage(err);
        this.disciplinas = [];
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
// eslint-disable-next-line no-irregular-whitespace
  }

}

