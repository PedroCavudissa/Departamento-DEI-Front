
import { Component, OnInit } from '@angular/core';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';
import {  Disciplina, DisciplinaService } from '../../../Services/disciplina.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const estudanteId = 1;
@Component({
  selector: 'app-detalhes-cadeiras-secretaria',
  standalone: true,
  imports: [BarralateralSecretariaComponent,FormsModule,CommonModule],
  templateUrl: './detalhes-cadeiras-secretaria.component.html',
  styleUrls: ['./detalhes-cadeiras-secretaria.component.css'],
})
export class DetalhesCadeirasSecretariaComponent  {
  disciplinas: Disciplina[] = [];
  anoSelecionado: string = '';
  textoBusca: string = '';
  disciplinaSelecionada: any = null;

  verDetalhes(disciplina: any) {
    this.disciplinaSelecionada = disciplina;
  }
  
  fecharModal() {
    this.disciplinaSelecionada = null;
  }
  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.carregarDisciplinas();
  }

  carregarDisciplinas(): void {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (dados) => {
        this.disciplinas = dados;
        console.log('Disciplinas:', dados);
      },
      error: (err) => {
        console.error(' Erro ao carregar disciplinas:', err);
        alert('Erro ao carregar disciplinas. Por favor, tente novamente mais tarde.');
      }
      
    });
  }
  get disciplinasFiltradas(): Disciplina[] {
    return this.disciplinas.filter(d => {
      const buscaTexto = this.textoBusca.toLowerCase();
      const nomeMatch = d.nome.toLowerCase().includes(buscaTexto);
      const anoMatch = this.anoSelecionado === '' || d.anoAcademico === this.anoSelecionado;
      return nomeMatch && anoMatch;
    });
  }
  
}

