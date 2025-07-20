import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { EstudanteService, Estudante } from '../../../Services/estudante.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [BarralateralComponent,FormsModule,CommonModule],
  templateUrl: './menu-estudantes.component.html',
  styleUrls: ['./menu-estudantes.component.css'],
})
export class MenuEstudantesComponent implements AfterViewInit {

  colors: Record<string, string> = {
    '1º Ano': '#009cff',
    '2º Ano': '#ff9400',
    '3º Ano': '#808080',
    '4º Ano': '#ffe600',
    '5º Ano': '#004080',
  };



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
    const normalizar = (texto: string) =>
      texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
    return this.estudantes.filter(d => {
      const buscaTexto = normalizar(this.textoBusca || '');
  
      const nomeMatch = d.nome && normalizar(d.nome).includes(buscaTexto);
      const numDocumentoMatch = d.numIdentificacao && d.numIdentificacao.toLowerCase().includes(buscaTexto);
      const anoAcademicoMatch = d.anoAcademico && d.anoAcademico.toString().includes(buscaTexto);
      const statusMatch = d.statusEstudante && normalizar(d.statusEstudante).includes(buscaTexto);
      
      const anoMatch = this.anoSelecionado === '' || d.anoAcademico === parseInt(this.anoSelecionado, 10);
  
      return anoMatch && (nomeMatch || numDocumentoMatch || anoAcademicoMatch || statusMatch);
    });
  }
  
  
  ngAfterViewInit(): void {
    this.gerarGraficos();
  }

  gerarGraficos(): void {
    const anos = [1, 2, 3, 4, 5];
    const labels = anos.map(ano => `${ano}º Ano`);

    // Buscar estudantes de todos os anos
    Promise.all(anos.map(ano => 
      this.estudanteService.getEstudantesPorAno(ano).toPromise()
    )).then(resultados => {
      const totaisPorAno = resultados.map(estudantes => (estudantes?.length || 0));

      const totalMatriculados = totaisPorAno.reduce((soma, atual) => soma + atual, 0);

      // Gráfico de Pizza
      const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement;
      new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['Total Matriculados'],
          datasets: [{
            data: [totalMatriculados],
            backgroundColor: ['#009cff'],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              align: 'start',
              labels: {
                boxWidth: 30,
                padding: 10,
              },
            },
          },
        },
      });

      // Gráfico de Barras
      const barCtx = document.getElementById('bar-chart') as HTMLCanvasElement;
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Estudantes por Ano',
            data: totaisPorAno,
            backgroundColor: labels.map(label => this.colors[label]),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }).catch(err => {
      console.error('❌ Erro ao gerar gráficos:', err);
    });
  }
}
