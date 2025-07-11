import { Component, OnInit } from '@angular/core';
import { Disciplina, DisciplinaService } from '../../../services/disciplina.service';
import { CommonModule } from '@angular/common';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { FormsModule } from '@angular/forms';

const estudanteId = 1;
@Component({
  selector: 'app-detalhes-cadeiras',
  standalone: true,
  imports: [CommonModule, BarralateralComponent, FormsModule],
  templateUrl: './detalhes-cadeiras.component.html',
  styleUrl: './detalhes-cadeiras.component.css',
})
export class DetalhesCadeirasComponent implements OnInit {
 
    disciplinas: Disciplina[] = [];
    errorMessage: string | null = null;
  
    constructor(private disciplinaService: DisciplinaService) {}
  
    ngOnInit(): void {
      this.carregarEstudantes();
    }
  
//     
carregarEstudantes(): void {
  this.disciplinaService.getDisciplinas().subscribe({
    next: (data: Disciplina[]) => {
      // 🔍 Filtra apenas as disciplinas do estudante, se necessário
      this.disciplinas = data.filter(d => d.id === estudanteId); 
      this.errorMessage = null;
    },
    error: (err: Error) => {
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