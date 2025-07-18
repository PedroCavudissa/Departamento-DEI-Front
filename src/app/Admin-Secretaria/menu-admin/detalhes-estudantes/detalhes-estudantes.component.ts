import { Component, OnInit } from '@angular/core';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { Estudante, EstudanteService } from '../../../Services/estudante.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-estudantes',
  standalone: true,
  imports: [BarralateralComponent,FormsModule,CommonModule],
  templateUrl: './detalhes-estudantes.component.html',
  styleUrl: './detalhes-estudantes.component.css',
})
export class DetalhesEstudantesComponent  implements OnInit{

  estudantes: Estudante[] = [];
  anoSelecionado: string = '';
  textoBusca: string = '';
  estudanteSelecionado: any = null;

  verDetalhes(estudante: any) {
    this.estudanteSelecionado = estudante;
  }
  
  fecharModal() {
    this.estudanteSelecionado = null;
  }
  
  constructor(private estudanteService: EstudanteService) {}

 
    ngOnInit(): void {
      this.carregarEstudantes();
    }


  carregarEstudantes(): void {
    const ano = Number(this.anoSelecionado);
    if (!ano) {
      this.estudantes = [];
      console.warn('⚠️ Selecione um ano para buscar os estudantes.');
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
  }
}
