import { Component, OnInit } from '@angular/core';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';
import { Estudante, EstudanteService } from '../../../services/estudante.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-estudantes-secretaria',
  imports: [BarralateralSecretariaComponent,CommonModule,FormsModule],
  templateUrl: './detalhes-estudantes-secretaria.component.html',
  styleUrl: './detalhes-estudantes-secretaria.component.css',
})
export class DetalhesEstudantesSecretariaComponent implements OnInit{

  estudantes: Estudante[] = [];
  anoSelecionado: string = '';
  textoBusca: string = '';

  constructor(private estudanteService: EstudanteService) {}

 
    ngOnInit(): void {
      this.anoSelecionado = '1';
      this.carregarEstudantes();
    }


  carregarEstudantes(): void {
    const ano = Number(this.anoSelecionado);
    if (!ano) {
      this.estudantes = [];
      console.warn('Selecione um ano para buscar os estudantes.');
      return;
    }
  
    this.estudanteService.getEstudantesPorAno(ano).subscribe({
      next: (dados) => {
        this.estudantes = dados;
        console.log(`📚 Estudantes do ${ano}º ano:`, dados);
      },
      error: (err) => {
        console.error('❌ Erro ao carregar estudantes:', err);
      }
    });
  }
  

  get estudantesFiltrados(): Estudante[] {
    return this.estudantes.filter(d => {
      const buscaTexto = this.textoBusca.toLowerCase();
      const nomeMatch = d.nome.toLowerCase().includes(buscaTexto);
      const anoMatch = this.anoSelecionado === '' || d.anoAcademico === parseInt(this.anoSelecionado, 10);

      return nomeMatch && anoMatch;
    });
  }}
