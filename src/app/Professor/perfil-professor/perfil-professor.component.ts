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
  professorSelecionado: Professor | undefined;
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
  errorMessage: null | undefined;



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
        nivelAcademico: 0,
        curriculo: '',
        dataIngresso: '',
      }
    };

    this.formulario = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        endereco: ['', [Validators.required, Validators.minLength(5)]],
        tipoDocumento: [{value: '', disabled: true}],
        dataIngresso: ['',],
        dataNascimento: [{value: '', disabled: true}],
        numDocumento: [{value: '', disabled: true}],
        cargo:['',] ,
        anoAcademico: ['',]
    });

    this.formularioSenha = this.fb.group({
      senhaAtual: ['', Validators.required],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validator: this.confirmarSenhaValidator });
  }

  

  // Validador personalizado para verificar se as senhas coincidem
  confirmarSenhaValidator(group: FormGroup): { [key: string]: any } | null {
    const novaSenha = group.get('novaSenha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return novaSenha === confirmarSenha ? null : { senhasNaoCoincidem: true };
  }

  // Validador para datas futuras
  validarDataNaoFutura(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const data = new Date(control.value);
    const hoje = new Date();
    return data > hoje ? { dataFutura: true } : null;
  }





  abrirModal() {
    this.mostrarModal = true;
    this.formularioSenha.reset();
    this.mensagemErroSenha = '';
    this.mensagemSucessoSenha = '';
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarSenha() {
    if (this.formularioSenha.invalid) {
      this.formularioSenha.markAllAsTouched();
      this.mensagemErroSenha = 'Por favor, preencha todos os campos corretamente';
      return;
    }

    const { senhaAtual, novaSenha } = this.formularioSenha.value;
    
    this.perfiprofService.alterarSenha(senhaAtual, novaSenha).subscribe({
      next: (response) => {
        const successMessage = typeof response === 'string' ? response : 'Senha alterada com sucesso!';
        this.mensagemSucessoSenha = successMessage;
        this.formularioSenha.reset();
        setTimeout(() => this.fecharModal(), 2000);
      },
      error: (err) => {
        console.error('Erro completo:', err);
        this.mensagemErroSenha = err.error.text || err.error || 'Erro ao alterar senha';
      }
    });
  }

  ngOnInit(): void {
    this.carregarDadosProfessor();
     this.buscarProfessor();
  }
carregarDadosProfessor(): void {
  this.professorService.getPerfilUsuario().subscribe({
    next: (resposta: any) => {
      if (resposta) {
        this.professor= {
          email: resposta.email || '',
          nome: resposta.nome || '',
          userDetails: {
            id: resposta.userDetails?.id || resposta.id || 0,
            cargo: resposta.userDetails?.cargo || resposta.cargo|| '',
            endereco: resposta.userDetails?.endereco || resposta.endereco || '',
            dataNascimento: resposta.userDetails?.dataNascimento || '',
            numDocumento: resposta.userDetails?.numDocumento || '',
            tipoDocumento: resposta.userDetails?.tipoDocumento || '',
            nivelAcademico: resposta.userDetails?.nivelAcademico || 0,
            dataIngresso: resposta.userDetails?.dataIngresso || '',
            curriculo: resposta.userDetails?. curriculo || '',
           
          }
        };

      
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

accao(): void {
  // Limpa mensagens anteriores e mostra a área de mensagens
  this.mostrarMensagens = true;
  this.mensagemSucesso = '';
  this.mensagemErro = '';

  // Verifica se o formulário é inválido
  if (this.formulario.invalid) {
    this.mensagemErro = 'Por favor, corrija os campos inválidos';
    this.formulario.markAllAsTouched();
    return;
  }

  if (!this.professor) {
    this.mensagemSucesso = 'Dados atualizados com sucesso!';
    return;
  }

  // Prepara os dados alterados
  const dadosAlterados: any = {};
  
  if (this.formulario.value.endereco !== this.professor.userDetails.endereco) {
    dadosAlterados.endereco = this.formulario.value.endereco;
  }
  
  if (this.formulario.value.email !== this.professor['email']) {
    dadosAlterados.email = this.formulario.value.email;
  }

  // Verifica se há algo para atualizar
  if (Object.keys(dadosAlterados).length === 0) {
    this.mensagemErro = 'Nenhum dado foi alterado';
    return;
  }

  if (this.professor && this.professor.userDetails) {
    this.professorService.atualizarPerfil(this.professor.userDetails.id, dadosAlterados)
      .subscribe({
        next: (resposta: any) => {
          // Atualiza os dados localmente
          if (this.professor) {
           // if (dadosAlterados.contacto) this.professor.userDetails.contacto = dadosAlterados.contacto;
            if (dadosAlterados.endereco) this.professor.userDetails.endereco = dadosAlterados.endereco;
            if (dadosAlterados.email) this.professor['email'] = dadosAlterados.email;
          }
          
          this.mensagemSucesso = 'Dados atualizados com sucesso!';
          
          // Limpa a mensagem após 3 segundos
          setTimeout(() => {
            this.mensagemSucesso = '';
          }, 3000);
          
          // Recarrega os dados do estudante
          setTimeout(() => this.carregarDadosProfessor(), 1000);
        },
        error: (err: HttpErrorResponse) => {
          this.mensagemErro = `Erro ${err.status}: ${err.error?.message || err.message}`;

          setTimeout(() => {
            this.mensagemErro = '';
          }, 3000);
        }
        
      });
  } 
}
  buscarProfessor(): void {
    this.professorService.getPerfilUsuario().subscribe({
      next: (data: Professor) => {
        this.professorSelecionado = data;
        this.errorMessage = null;
      },
      error: (err: { message: string }) => {
        console.error('Erro ao buscar estudante:', err);
        this.professorSelecionado = undefined;
      }
    });
  }
}