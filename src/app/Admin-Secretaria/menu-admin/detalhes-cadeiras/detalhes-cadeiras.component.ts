import { Component, OnInit } from '@angular/core';
import { DisciplinaService, Disciplina } from '../../../services/disciplina.service';
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
        console.error('Erro ao carregar disciplinas:', err);
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

  
  novaDisciplina = {
    sigla: '',
    nome: '',
    anoAcademico: null,
    semestre: null,
    precedenciasDisciplinaNome: [] as string[]
  };

  mostrarModalCadastro = false;

  abrirModalCadastro() {
    this.mostrarModalCadastro = true;
  }

  fecharModalCadastro() {
    this.mostrarModalCadastro = false;
    this.novaDisciplina = {
      sigla: '',
      nome: '',
      anoAcademico: null,
      semestre: null,
      precedenciasDisciplinaNome: [] as string[]
    };
  }

  cadastrarDisciplina() {
    console.log('Dados a enviar:', this.novaDisciplina);

    this.disciplinaService.createDisciplina(this.novaDisciplina).subscribe({
      next: () => {
        this.fecharModalCadastro();
        this.carregarDisciplinas();
      },
      error: (err) => {
        console.error('Erro ao cadastrar disciplina:', err);
        alert('Erro ao cadastrar disciplina');
      }
    });
  }

  verDetalhes(disciplina: any) {
    this.disciplinaSelecionada = disciplina;
  }

  fecharModal() {
    this.disciplinaSelecionada = null;
  }

  togglePrecedencia(nome: string) {
    const index = this.novaDisciplina.precedenciasDisciplinaNome.indexOf(nome);
    if (index === -1) {
      this.novaDisciplina.precedenciasDisciplinaNome.push(nome);
    } else {
      this.novaDisciplina.precedenciasDisciplinaNome.splice(index, 1);
    }
  }

  get precedenciasDisponiveis(): Disciplina[] {
    if (
      !this.novaDisciplina ||
      this.novaDisciplina.anoAcademico == null ||
      this.novaDisciplina.semestre == null
    ) {
      return [];
    }
  
    const anoAtual = +this.novaDisciplina.anoAcademico;
    const semestreAtual = +this.novaDisciplina.semestre;
  
    return this.disciplinas.filter(d => {
      const ano = +d.anoAcademico;
      const semestre = +d.semestre;
  
      // disciplinas de anos anteriores entram sempre
      if (ano < anoAtual) return true;
  
      // disciplinas do mesmo ano mas semestre menor também entram
      if (ano === anoAtual && semestre < semestreAtual) return true;
  
      return false;
    });
  }
  
  
}
