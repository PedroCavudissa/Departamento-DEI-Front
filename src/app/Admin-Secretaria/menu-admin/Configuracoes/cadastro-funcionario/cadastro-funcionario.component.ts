import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Notyf } from 'notyf';


import { BarralateralComponent } from '../../../barralateral/barralateral.component';
import { error } from 'jquery';
import { FuncionarioService } from '../../../../services/cadastro.service';

@Component({
  selector: 'app-cadastro-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule,BarralateralComponent],
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent {
  notyf = new Notyf({ duration: 3000, position: { x: 'right', y: 'top' } });

  funcionario = {
    nome: '',
    dataNascimento: '',
    numDocumento: '',
    tipoDocumento: 'BI',
    endereco: '',
    nivelAcademico: 'LICENCIATURA',
    cargo: '',
    email: '',
    dataIngresso: ''
  };

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {}

  cadastrar(): void {
    // 🔹 Validação mínima no front (evita requisições desnecessárias)
    if (!this.funcionario.nome || !this.funcionario.email || !this.funcionario.dataNascimento) {
      this.notyf.error('Preencha os campos obrigatórios: Nome, Email e Data de Nascimento.');
      return;
    }
  
    const funcionarioCorrigido = {
      ...this.funcionario,
      dataNascimento: new Date(this.funcionario.dataNascimento),
      dataIngresso: new Date(this.funcionario.dataIngresso)
    };
  
    this.funcionarioService.cadastrar(funcionarioCorrigido).subscribe({
      next: () => {
        this.notyf.success('Funcionário cadastrado com sucesso!');
        this.router.navigate(['/menu-admin']);
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
  
        // 🔹 Tratamento específico por código de status
        switch (err.status) {
          case 400:
            this.notyf.error('Dados inválidos. Verifique os campos e tente novamente.');
            break;
          case 401:
          case 403:
            this.notyf.error('Sessão expirada. Faça login novamente.');
            this.router.navigate(['/login']);
            break;
          case 409:
            this.notyf.error('Já existe um funcionário cadastrado com este email ou identificação.');
            break;
          case 0: // falha de rede
            this.notyf.error('Falha de conexão com o servidor. Verifique sua internet.');
            break;
          default:
            this.notyf.error('Erro inesperado ao cadastrar funcionário.');
        }
      }
    });
  }
  
  


  
}
