import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Professor, ProfessorService } from '../../services/professor.service';
import { PerfiprofService } from '../../services/perfiprof.service';
import { CommonModule } from '@angular/common';
import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component';

@Component({
  selector: 'app-perfil-professor',
  standalone: true,
  imports: [FormsModule, CommonModule,LateralProfessorComponent,ReactiveFormsModule],
  templateUrl: './perfil-professor.component.html',
  styleUrls: ['./perfil-professor.component.css'],
  providers: [ProfessorService, PerfiprofService]
})
export class PerfilProfessorComponent implements OnInit {
  formulario: FormGroup;
  formularioSenha: FormGroup;

  professor?: Professor;

  mostrarModal = false;
  mostrarMensagens = false;
  mensagemSucesso = '';
  mensagemErro = '';
  mensagemSucessoSenha = '';
  mensagemErroSenha = '';

  modoEdicao: boolean = false;

  constructor(
    private fb: FormBuilder,
    private professorService: ProfessorService,
    private perfiprofService: PerfiprofService
  ) {
    this.professor = {
      email: '',
      nome: '',
      userDetails: {
        id: 0,
        dataNascimento: '',
        numDocumento: '',
        tipoDocumento: '',
        endereco: '',
        cargo: '',
        anoAcademico: 0,
        curriculo: '',
        dataIngresso: '',
      }
    };

    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.formularioSenha = this.fb.group({
      senhaAtual: ['', Validators.required],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validator: this.confirmarSenhaValidator });
  }

  ngOnInit(): void {
    this.carregarDadosProfessor();
  }

  alternarModoEdicao(): void {
    if (this.modoEdicao) {
      this.salvarDados();
    }
    this.modoEdicao = !this.modoEdicao;
  }

  salvarDados(): void {
    if (this.formulario.valid) {
      this.accao();
      this.modoEdicao = false;
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  accao(): void {
    if (!this.professor) return;

    if (this.formulario.invalid) {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente';
      this.formulario.markAllAsTouched();
      return;
    }

    const dadosAlterados: any = {};

    if (this.formulario.value.email !== this.professor.email) {
      dadosAlterados.email = this.formulario.value.email;
    }

    if (this.formulario.value.endereco !== this.professor.userDetails.endereco) {
      dadosAlterados.endereco = this.formulario.value.endereco;
    }

    if (Object.keys(dadosAlterados).length === 0) {
      this.mensagemErro = 'Nenhum dado foi alterado';
      return;
    }

    this.professorService.atualizarPerfil(this.professor.userDetails.id, dadosAlterados).subscribe({
      next: (res: any) => {
        this.mensagemSucesso = 'Dados atualizados com sucesso!';
        if (dadosAlterados.email) this.professor!.email = dadosAlterados.email;
        if (dadosAlterados.endereco) this.professor!.userDetails.endereco = dadosAlterados.endereco;

        setTimeout(() => this.carregarDadosProfessor(), 1000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao atualizar:', err);
        this.mensagemErro = `Erro ${err.status}: ${err.error?.message || err.message}`;
      }
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
    this.formularioSenha.reset();
    this.mensagemErroSenha = '';
    this.mensagemSucessoSenha = '';
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  salvarSenha(): void {
    if (this.formularioSenha.invalid) {
      this.formularioSenha.markAllAsTouched();
      this.mensagemErroSenha = 'Por favor, preencha todos os campos corretamente';
      return;
    }

    const { senhaAtual, novaSenha } = this.formularioSenha.value;

    this.perfiprofService.alterarSenha(senhaAtual, novaSenha).subscribe({
      next: (response: any) => {
        this.mensagemSucessoSenha = typeof response === 'string' ? response : 'Senha alterada com sucesso!';
        this.formularioSenha.reset();
        setTimeout(() => this.fecharModal(), 2000);
      },
      error: (err: any) => {
        console.error('Erro ao alterar senha:', err);
        this.mensagemErroSenha = err.error?.text || 'Erro ao alterar senha';
      }
    });
  }

  carregarDadosProfessor(): void {
    this.professorService.getProfessor().subscribe({
      next: (res: any) => {
        if (res && res.userDetails) {
          this.professor = {
            nome: res.nome || '',
            email: res.email || '',
            userDetails: {
              id: res.userDetails.id || res.id || 0,
              endereco: res.userDetails.endereco || '',
              dataNascimento: res.userDetails.dataNascimento || '',
              numDocumento: res.userDetails.numIdentificacao || '',
              tipoDocumento: res.userDetails.tipoDocumento || '',
              nivelAcademico: res.userDetails.nivelAcademico || '',
              dataIngresso: res.userDetails.dataIngresso || '',
              cargo: res.userDetails.cargo || '',
              curriculo: res.userDetails.curriculo || '',
              anoAcademico: res.userDetails.anoAcademico || 0
            }
          };

          this.formulario.patchValue({
            email: this.professor.email,
            endereco: this.professor.userDetails.endereco
          });
        } else {
          this.mensagemErro = 'Estrutura de dados inválida da API';
        }
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao carregar dados: ' + err.message;
        console.error('Erro completo:', err);
      }
    });
  }

  confirmarSenhaValidator(group: FormGroup): ValidationErrors | null {
    const novaSenha = group.get('novaSenha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return novaSenha === confirmarSenha ? null : { senhasNaoCoincidem: true };
  }
}
