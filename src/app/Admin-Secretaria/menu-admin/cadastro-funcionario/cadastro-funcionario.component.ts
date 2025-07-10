import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Notyf } from 'notyf';
import { FuncionarioService } from '../../../services/cadastro.service';
import { BarralateralComponent } from '../../barralateral/barralateral.component';

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
    this.funcionarioService.cadastrar(this.funcionario).subscribe({
      next: () => {
        this.notyf.success('Funcionário cadastrado com sucesso!');
        this.router.navigate(['/menu-admin']);
      },
      error: (err) => {
        console.error(err);
        this.notyf.error('Erro ao cadastrar funcionário!');
      }
    });
  }
}
