
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EstudanteService, Estudante } from '../../../services/estudante.service';
import { Notyf } from 'notyf';
import { BarralateralSecretariaComponent } from '../../../Admin-Secretarias/barralateral-secretaria/barralateral-secretaria.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralSecretariaComponent],
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
    statusEstudante: 'ACTIVO',
    userDetails: undefined
  };

  

  constructor(
    private router: Router,
    private estudanteService: EstudanteService
  ) {}

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  avancar(): void {
    const estudanteFormatado: Estudante = {
      ...this.estudante,
      dataNascimento: this.formatDate(this.estudante.dataNascimento),
      dataIngresso: this.formatDate(this.estudante.dataIngresso),
      dataConclusao: this.estudante.dataConclusao ? this.formatDate(this.estudante.dataConclusao) : ''
    };
  
    console.log('Token JWT:', localStorage.getItem('token'));
    console.log('Enviando estudante:', estudanteFormatado);
  
    this.estudanteService.cadastrar(estudanteFormatado).subscribe({
      next: () => {
        this.notyf.success('Estudante cadastrado com sucesso!');
        this.router.navigate(['/menu-admin']);
      },

      error: (err) => {
        console.error('Erro no cadastro:', err);
        this.notyf.error('Erro ao cadastrar estudante. Veja o console.');
      }
    });
  }
  
  
  
  
}

