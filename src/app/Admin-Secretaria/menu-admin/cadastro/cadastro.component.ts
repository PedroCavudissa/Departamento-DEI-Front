/*
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EstudanteService, Estudante } from '../../../Services/estudante.service';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  notyf = new Notyf({ duration: 3000, position: { x: 'right', y: 'top' } });

  estudante: Estudante = {
    nome: '',
    dataNascimento: '',
    numIdentificacao: '',
    tipoDocumento: '',
    endereco: '',
    contacto: '',
    anoAcademico: 1,
    dataIngresso: '',
    email: '',
    instituicaoAnterior: '',
    notaExameAcesso: 0,
    notaEnsinoMedio: 0,
    regimeIngresso: 'EXAME_ACESSO',
    dataConclusao: '',
    statusEstudante: 'ACTIVO'
  };

  constructor(
    private router: Router,
    private estudanteService: EstudanteService
  ) {}

  formatarData(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > 2) valor = valor.slice(0, 2) + '/' + valor.slice(2);
    if (valor.length > 5) valor = valor.slice(0, 5) + '/' + valor.slice(5, 9);
    input.value = valor;
    this.estudante.dataNascimento = valor;
  }

  avancar(): void {
    this.estudanteService.cadastrar(this.estudante).subscribe({
      next: () => {
        this.notyf.success('Estudante cadastrado com sucesso!');
        this.router.navigate(['/menu-admin']); 
      },
      error: (error: any) => {
        console.error(error);
        this.notyf.error('Erro ao cadastrar estudante.');
      }
    });
  }
// */
