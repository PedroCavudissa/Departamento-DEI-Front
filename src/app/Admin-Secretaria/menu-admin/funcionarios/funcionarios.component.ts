import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { FuncionarioService, Funcionario } from './Services/funcionario.service';
import { BarralateralComponent } from '../../barralateral/barralateral.component';

@Component({
  selector: 'app-tela-funcionario',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, BarralateralComponent]
})
export class FuncionariosComponent implements OnInit, AfterViewInit {
  funcionarios: Funcionario[] = [];
  filtroFuncao: string = '';
  pesquisaNome: string = '';

  constructor(private funcionarioService: FuncionarioService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.atualizarGraficos();
    });
  }

  // carregarFuncionarios(): void {
  //   this.funcionarioService.listarFuncionarios(this.filtroFuncao, this.pesquisaNome)
  //     .subscribe({
  //       next: (res) => {
  //         this.funcionarios = res.content;
  //         this.cdr.detectChanges();
  //         this.atualizarGraficos();
  //         console.log('Dados recebidos:', res.content);
  //       },
  //       error: (erro) => {
  //         console.error('Erro completo:', erro);
  //         if (erro.status === 0) {
  //           alert('Erro de conexão com o servidor. Verifique sua internet ou ngrok.');
  //         } else if (erro.status === 404) {
  //           alert('Endpoint não encontrado. Verifique a URL da API.');
  //         } else {
  //           alert(`Erro ${erro.status}: ${erro.message || 'Erro no servidor'}`);
  //         }
  //       }
  //     });
  // }
carregarFuncionarios(): void {
  this.funcionarioService.listarFuncionarios(this.filtroFuncao, this.pesquisaNome)
    .subscribe({
      next: (res: any) => {
        if (!res?.content) {
          throw new Error('Estrutura de dados inválida');
        }
        this.funcionarios = res.content;
        this.cdr.detectChanges();
        this.atualizarGraficos();
      },
      error: (erro: Error) => {
        console.error('Erro completo:', erro);
        
        let mensagem = 'Erro ao carregar dados';
        if (erro.message.includes('JSON')) {
          mensagem = 'O servidor retornou dados inválidos (não é JSON)';
        } else if (erro.message.includes('conexão')) {
          mensagem = 'Verifique sua conexão com a internet';
        } else if (erro.message.includes('formato inválido')) {
          mensagem = 'O servidor está retornando HTML em vez de JSON';
        }
        
        alert(`${mensagem}\n\nDetalhes técnicos: ${erro.message}`);
      }
    });
}


  onBuscar(): void {
    this.carregarFuncionarios();
  }

  atualizarGraficos(): void {
    const totalPorCargo = this.funcionarios.reduce((acc: Record<string, number>, func) => {
      const cargo = func.cargo || 'Desconhecido';
      acc[cargo] = (acc[cargo] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(totalPorCargo);
    const valores = Object.values(totalPorCargo);

    this.renderGrafico('graficoDI', labels, valores, 'Distribuição por Cargo');
    this.renderGrafico('graficoProfessores', ['Professores', 'Outros'], [
      totalPorCargo['PROFESSOR'] || 0,
      this.funcionarios.length - (totalPorCargo['PROFESSOR'] || 0)
    ], 'Professores vs Outros');
  }

  renderGrafico(id: string, labels: string[], data: number[], titulo: string): void {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (!canvas) return;

    if (Chart.getChart(canvas)) {
      Chart.getChart(canvas)?.destroy();
    }

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: titulo,
          data: data,
          backgroundColor: ['#47B5FF', '#007bff', '#1e90ff', '#005f99']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}