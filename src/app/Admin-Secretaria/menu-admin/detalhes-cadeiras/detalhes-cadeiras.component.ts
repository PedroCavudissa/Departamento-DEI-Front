import { Component, OnInit } from '@angular/core';
import { DisciplinaService, Disciplina } from '../../../Services/disciplina.service';
import { CommonModule } from '@angular/common';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-cadeiras',
  standalone: true,
  imports: [CommonModule, BarralateralComponent, FormsModule],
  templateUrl: './detalhes-cadeiras.component.html',
  styleUrls: ['./detalhes-cadeiras.component.css'],
})
export class DetalhesCadeirasComponent implements OnInit {
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
        console.log('📚 Disciplinas:', dados);
      },
      error: (err) => {
        console.error(' Erro ao carregar disciplinas:', err);
      
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
