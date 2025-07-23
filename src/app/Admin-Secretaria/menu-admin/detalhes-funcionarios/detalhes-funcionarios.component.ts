import { Component, OnInit } from '@angular/core';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Funcionario, FuncionarioService } from '../../../Services/cadastro.service';

@Component({
  selector: 'app-detalhes-funcionarios',
  standalone: true,
  imports: [BarralateralComponent, CommonModule, FormsModule],
  templateUrl: './detalhes-funcionarios.component.html',
  styleUrl: './detalhes-funcionarios.component.css',
})export class DetalhesFuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  cargoSelecionado: string = ''; 
  textoBusca: string = '';

  readonly CARGOS = ['PROFESSOR', 'SECRETARIA', 'ADMINISTRADOR'];
  funcionarioSelecionado: any = null;

  verDetalhes(funcionario: any) {
    this.funcionarioSelecionado = funcionario;
  }
  
  fecharModal() {
    this.funcionarioSelecionado = null;
  }
  
  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.funcionarioService.getFuncionarios().subscribe({
      next: (dados) => {
        this.funcionarios = dados || []; 
      },
      error: (err) => console.error('Erro ao carregar funcionários:', err)
    });
  }

  get funcionariosFiltrados(): Funcionario[] {
    return this.funcionarios.filter(f => {
      const nomeMatch = f.nome.toLowerCase().includes(this.textoBusca.toLowerCase());
      const cargoMatch = this.cargoSelecionado === '' || f.cargo === this.cargoSelecionado;
      return nomeMatch && cargoMatch;
    });
  }
}
