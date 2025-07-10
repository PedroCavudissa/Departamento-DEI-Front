import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';
import { Disciplina, DisciplinaService } from '../../../Services/disciplina.service';

const estudanteId = 1;

@Component({
  selector: 'app-detalhes-cadeiras-secretaria',
  standalone: true, // ✅ este decorador precisa estar presente
  imports: [BarralateralSecretariaComponent, FormsModule, CommonModule],
  templateUrl: './detalhes-cadeiras-secretaria.component.html',
  styleUrls: ['./detalhes-cadeiras-secretaria.component.css']
})
export class DetalhesCadeirasSecretariaComponent implements OnInit {
  disciplinas: Disciplina[] = [];
  errorMessage: string | null = null;

  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.carregarEstudantes();
  }

  carregarEstudantes(): void {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (dados: Disciplina[]) => {
        this.disciplinas = dados.filter(d => d.id === estudanteId);
      },
      error: (erro: Error) => {
        this.errorMessage = this.getErrorMessage(erro);
        console.error('Erro ao carregar disciplinas:', erro);
      }
    });
  }

  private getErrorMessage(err: Error): string {
    if (err.message.includes('HTML em vez de dados JSON')) {
      return 'O servidor está retornando uma página HTML. Verifique a API.';
    } else if (err.message.includes('JSON válido')) {
      return 'Os dados recebidos não estão no formato JSON correto.';
    }
    return err.message;
  }
}