
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EstudanteService, Estudante } from '../../../services/estudante.service';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralSecretariaComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  
  estudante: Estudante = {
    id: 0,
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
    statusEstudante: 'EM_FORMAÇÃO',
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
    // 🔹 Validação simples no front antes de enviar
    if (!this.estudante.nome || !this.estudante.email || !this.estudante.dataNascimento) {
      this.notyf.error('Preencha os campos obrigatórios: Nome, Email e Data de Nascimento.');
      return;
    }
  
    const estudanteFormatado: Estudante = {
      ...this.estudante,
      dataNascimento: this.formatDate(this.estudante.dataNascimento),
      dataIngresso: this.formatDate(this.estudante.dataIngresso),
      dataConclusao: this.estudante.dataConclusao ? this.formatDate(this.estudante.dataConclusao) : ''
    };
  
    this.estudanteService.cadastrar(estudanteFormatado).subscribe({
      next: () => {
        this.notyf.success('Estudante cadastrado com sucesso!');
        this.router.navigate(['/detalhes-estudantes-secretaria']); 
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
  
        // 🔹 Tratamento mais específico
        if (err.status === 400) {
          this.notyf.error('Dados inválidos. Verifique os campos e tente novamente.');
        } else if (err.status === 401 || err.status === 403) {
          this.notyf.error('Sessão expirada. Faça login novamente.');
          this.router.navigate(['/login']);
        } else if (err.status === 409) {
          this.notyf.error('Já existe um estudante com este número de identificação ou e-mail.');
        } else if (err.status === 0) {
          this.notyf.error('Falha de conexão com o servidor.');
        } else {
          this.notyf.error('Erro inesperado ao cadastrar estudante.');
        }
      }
    });
  }
  
  
  
  
  
}

