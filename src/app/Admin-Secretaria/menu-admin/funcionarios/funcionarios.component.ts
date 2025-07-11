import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { BarralateralComponent } from "../../barralateral/barralateral.component";

interface Funcionario {
  id: number;
  nome: string;
  apelido: string;
  num_doc: string;
  tipo_doc: string;
  nivel_acad: string;
  role: {
    id: number;
    role: string;
    descricao: string;
    createdAt: string;
  };
}

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

  private apiUrl = 'https://4915-154-118-198-44.ngrok-free.app/api/funcionario/listar';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.atualizarGraficos();
    });
  }

  carregarFuncionarios(): void {
    let params = new HttpParams();

    if (this.filtroFuncao) {
      params = params.set('funcao', this.filtroFuncao);
    }

    if (this.pesquisaNome) {
      params = params.set('nome', this.pesquisaNome.trim());
    }

    this.http.get(this.apiUrl, { params, responseType: 'text' }).subscribe({
      next: res => {
        try {
          const json = JSON.parse(res);
          console.log('JSON válido recebido:', json);

          this.funcionarios = json.data || [];
          this.cdr.detectChanges();
          this.atualizarGraficos();
        } catch (e) {
          console.error('❌ Resposta inválida ou em HTML:', res);
          alert('Erro ao carregar funcionários: resposta inesperada do servidor.');
        }
      },
      error: erro => {
        console.error('❌ Erro de rede ou servidor:', erro);
        alert('Erro ao comunicar com a API.');
      }
    });
  }

  onBuscar(): void {
    this.carregarFuncionarios();
  }

  atualizarGraficos(): void {
    const totalPorFuncao = this.funcionarios.reduce((acc: Record<string, number>, func) => {
      const funcao = func.role?.role || 'Desconhecido';
      acc[funcao] = (acc[funcao] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(totalPorFuncao);
    const valores = Object.values(totalPorFuncao);

    this.renderGrafico('graficoDI', labels, valores, 'Distribuição por Função');
    this.renderGrafico('graficoProfessores', ['Professores', 'Outros'], [
      totalPorFuncao['Professor'] || 0,
      this.funcionarios.length - (totalPorFuncao['Professor'] || 0)
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