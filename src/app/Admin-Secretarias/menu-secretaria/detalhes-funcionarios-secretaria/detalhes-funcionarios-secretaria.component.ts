import { Component } from '@angular/core';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';
import { Funcionario, FuncionarioService } from '../../../services/cadastro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-funcionarios-secretaria',
  standalone: true,
  imports: [BarralateralSecretariaComponent,CommonModule,FormsModule],
  templateUrl: './detalhes-funcionarios-secretaria.component.html',
  styleUrl: './detalhes-funcionarios-secretaria.component.css',
})
export class DetalhesFuncionariosSecretariaComponent {
  
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
