// comunicadosF.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComunicadosService } from '../../../../services/comunicadoF.service';
import { Comunicado } from '../../../../models/comunicadoF.model';

@Component({
  selector: 'app-comunicadosf',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comunicadosF.component.html',
  styleUrls: ['./comunicadosF.component.css']
})
export class ComunicadosComponent implements OnInit {
  comunicados: Comunicado[] = [];
  destinoSelecionado = 'TODOS';
  estado: 'carregando' | 'sucesso' | 'erro' | 'vazio' = 'carregando';
  mensagemErro= '';

  opcoesDestino = [
    { valor: 'TODOS', label: 'Todos' },
    { valor: 'PROFESSOR', label: 'Professor' },
    { valor: 'ESTUDANTE', label: 'Estudante' },
    { valor: 'SECRETARIA', label: 'Secretaria' },
    { valor: 'ADMINISTRADOR', label: 'Administrador' }
  ];

  constructor(private comunicadosService: ComunicadosService) {}

  ngOnInit(): void {
    this.carregarComunicados();
  }

  carregarComunicados(): void {
    this.estado = 'carregando';
    this.mensagemErro = '';

    this.comunicadosService.getPorDestino(this.destinoSelecionado).subscribe({
      next: (comunicados) => {
        this.comunicados = comunicados;
        this.estado = comunicados.length > 0 ? 'sucesso' : 'vazio';
      },
      error: (erro) => {
        this.estado = 'erro';
        this.mensagemErro = erro.message;
        console.error('Erro ao carregar comunicados:', erro);
      }
    });
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
