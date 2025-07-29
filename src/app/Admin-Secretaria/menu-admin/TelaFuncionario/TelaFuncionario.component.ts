import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Chart from 'chart.js/auto';

import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Funcionario, FuncionarioService } from '../../../services/cadastro.service';

@Component({
  selector: 'app-tela-funcionario',
  templateUrl: './TelaFuncionario.component.html',
  styleUrls: ['./TelaFuncionario.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, BarralateralComponent]
})
export class FuncionariosComponent implements OnInit, AfterViewInit {
  todosFuncionarios: Funcionario[] = [];
  funcionarios: Funcionario[] = [];
  filtroFuncao: string = '';
  pesquisaNome: string = '';
  loading: boolean = true;
  graficoDI: any;
  graficoProfessores: any;
  funcionarioSelecionado: any = null;

  private pesquisaSubject = new Subject<string>();
  constructor(
    private funcionarioService: FuncionarioService,
    private cdr: ChangeDetectorRef

  ) {}

  verDetalhes(funcionario: any) {
    this.funcionarioSelecionado = funcionario;
  }
  
  fecharModal() {
    this.funcionarioSelecionado = null;
  }
  ngOnInit(): void {

    this.carregarFuncionarios();
    this.pesquisaSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(termo => {
      this.pesquisaNome = termo;
      this.aplicarFiltros();
    });

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.funcionarios.length > 0) {
        this.atualizarGraficos();
      }
    });

  }


carregarFuncionarios(): void {

    this.loading = true;

    this.funcionarioService.getFuncionarios().subscribe({

      next: (funcionarios) => {
    this.todosFuncionarios = this.ordenarPorNome(funcionarios);
this.funcionarios = [...this.todosFuncionarios];
        this.loading = false;
        this.atualizarGraficos();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro:', erro);
        this.loading = false;
        alert(erro.message);
      }

    });

  }


  private ordenarPorNome(funcionarios: Funcionario[]): Funcionario[] {
    return [...funcionarios].sort((a, b) => 
      a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })

    );

  }

  onPesquisaChange(termo: string): void {
    this.pesquisaSubject.next(termo);

  }

  onBuscar(): void {
    this.aplicarFiltros();
  }




  aplicarFiltros(): void {

    let resultados = this.todosFuncionarios.filter(func => {

      const cargoMatch = !this.filtroFuncao || func.cargo === this.filtroFuncao;

      const termo = this.pesquisaNome.toLowerCase();

      const pesquisaMatch = !termo || 

                          func.nome.toLowerCase().includes(termo) ||

                          (func.numDocumento && func.numDocumento.toLowerCase().includes(termo));

      return cargoMatch && pesquisaMatch;

    });




    resultados = this.ordenarPorNome(resultados);

    this.funcionarios = resultados;

    this.atualizarGraficos();

    this.cdr.detectChanges();

  }




  atualizarGraficos(): void {

    if (this.funcionarios.length === 0) return;




    // Gráfico de Distribuição por Cargo

    const totalPorCargo = this.funcionarios.reduce((acc: any, func) => {

      acc[func.cargo] = (acc[func.cargo] || 0) + 1;

      return acc;

    }, {});




    const ctxDI = document.getElementById('graficoDI') as HTMLCanvasElement;

    if (ctxDI) {

      if (this.graficoDI) this.graficoDI.destroy();

      this.graficoDI = new Chart(ctxDI, {

        type: 'bar',

        data: {

          labels: Object.keys(totalPorCargo),

          datasets: [{

            label: 'Distribuição por Cargo',

            data: Object.values(totalPorCargo),

            backgroundColor: '#47B5FF'

          }]

        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {

            legend: {

              display: false

            },

            tooltip: {

              callbacks: {

                label: (context) => `${context.parsed.y} funcionário(s)`

              }

            }

          },

          scales: {

            y: {

              beginAtZero: true,

              ticks: {

                precision: 0

              }

            }

          }

        }

      });

    }




    // Gráfico Professores/Secretaria vs Outros

    const totalProfessores = totalPorCargo['PROFESSOR'] || 0;

    const totalSecretaria = totalPorCargo['SECRETARIA'] || 0;

    const totalOutros = this.funcionarios.length - totalProfessores - totalSecretaria;




    const ctxProfessores = document.getElementById('graficoProfessores') as HTMLCanvasElement;

    if (ctxProfessores) {

      if (this.graficoProfessores) this.graficoProfessores.destroy();

      this.graficoProfessores = new Chart(ctxProfessores, {

        type: 'pie',

        data: {

          labels: ['Professores', 'Secretaria', 'Outros'],

          datasets: [{

            data: [totalProfessores, totalSecretaria, totalOutros],

            backgroundColor: ['#47B5FF', '#1363DF', '#06283D']

          }]

        },

        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {

            legend: {

              position: 'bottom'

            },

            tooltip: {

              callbacks: {

                label: (context) => {

                  const label = context.label || '';

                  const value = context.raw || 0;

                  return `${label}: ${value} funcionário(s)`;

                }

              }

            }

          }

        }

      });

    }

  }

}