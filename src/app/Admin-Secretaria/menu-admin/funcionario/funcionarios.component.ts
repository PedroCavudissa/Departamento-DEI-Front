import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { FuncionarioService, Funcionario } from './Services/funcionario.service';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tela-funcionario',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, BarralateralComponent]
})
export class FuncionariosComponent implements OnInit, AfterViewInit, OnDestroy {
  todosFuncionarios: Funcionario[] = [];
  funcionarios: Funcionario[] = [];
  filtroFuncao: string = '';
  pesquisaNome: string = '';
  loading: boolean = true;
  graficoDI: Chart | null = null;
  graficoProfessores: Chart | null = null;
  
  private pesquisaSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private funcionarioService: FuncionarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
    
    this.pesquisaSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destruirGraficos();
  }

  private destruirGraficos(): void {
    if (this.graficoDI) {
      this.graficoDI.destroy();
      this.graficoDI = null;
    }
    if (this.graficoProfessores) {
      this.graficoProfessores.destroy();
      this.graficoProfessores = null;
    }
  }

  carregarFuncionarios(): void {
    this.loading = true;
    this.funcionarioService.carregarTodosFuncionarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (funcionarios) => {
          this.todosFuncionarios = funcionarios;
          this.funcionarios = [...funcionarios];
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

  onBuscar(): void {
    this.aplicarFiltros();
  }

  private aplicarFiltros(): void {
    this.funcionarios = this.todosFuncionarios.filter(func => {
      const cargoMatch = !this.filtroFuncao || func.cargo === this.filtroFuncao;
      const termo = this.pesquisaNome.toLowerCase();
      const pesquisaMatch = !termo || 
                          func.nome.toLowerCase().includes(termo) ||
                          (func.numDocumento && func.numDocumento.toLowerCase().includes(termo));
      
      return cargoMatch && pesquisaMatch;
    });

    this.atualizarGraficos();
    this.cdr.detectChanges();
  }

  private atualizarGraficos(): void {
    this.destruirGraficos();

    if (this.funcionarios.length === 0) return;

    // Gráfico de Distribuição por Cargo
    const totalPorCargo = this.funcionarios.reduce((acc: Record<string, number>, func) => {
      acc[func.cargo] = (acc[func.cargo] || 0) + 1;
      return acc;
    }, {});

    const ctxDI = document.getElementById('graficoDI') as HTMLCanvasElement;
    if (ctxDI) {
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
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }

    // Gráfico Professores vs Secretaria vs Outros
    const totalProfessores = totalPorCargo['PROFESSOR'] || 0;
    const totalSecretaria = totalPorCargo['SECRETARIA'] || 0;
    const totalOutros = this.funcionarios.length - totalProfessores - totalSecretaria;
    
    const ctxProfessores = document.getElementById('graficoProfessores') as HTMLCanvasElement;
    if (ctxProfessores) {
      this.graficoProfessores = new Chart(ctxProfessores, {
        type: 'pie',
        data: {
          labels: ['Professores', 'Secretaria', 'Outros'],
          datasets: [{
            data: [totalProfessores, totalSecretaria, totalOutros],
            backgroundColor: ['#47B5FF', '#005f99', '#003366'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  }
}