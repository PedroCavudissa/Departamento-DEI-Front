
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LateralComponent } from '../lateral/lateral.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilestudanteService } from '../../Services/perfilestudante.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Viestudante, ViestudanteService } from '../../Services/viestudante.service';

@Component({
  selector: 'app-perfil-estudante',
  standalone: true,
  imports: [LateralComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-estudante.component.html',
  styleUrl: './perfil-estudante.component.css',
  providers: [ViestudanteService, PerfilestudanteService]
})
export class PerfilEstudanteComponent implements OnInit {

  estudanteSelecionado: Viestudante | undefined;
  mostrarModal = false;
  mostrarMensagens = false; 
  formulario: FormGroup;
mensagemSucesso: string = '';
mensagemErro: string = '';
  mensagemErroSenha = '';
  mensagemSucessoSenha = '';
  formularioSenha: FormGroup;
  errorMessage: null | undefined;
  viestudante?: Viestudante
  constructor(
    private fb: FormBuilder,
    private viestudanteService: ViestudanteService,
    private perfilestudanteService: PerfilestudanteService
  ) {
    this.viestudante = {
      email: '', 
      nome: '',
      userDetails: {
        id: 0,
        dataNascimento: '',
        numIdentificacao: '',
        tipoDocumento: '',
        endereco: '',
        contacto: '',
        anoAcademico: 0,
        dataIngresso: '',
        dataConclusao: '',
        statusEstudante: '',
       instituicaoAnterior: '',
       notaExameAcesso: 0,
        notaEnsinoMedio: 0,
        regimeIngresso: ''
      }
    };
    
    this.formulario = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  contato: [''],
  endereco: ['', [Validators.minLength(5)]],
  anoAcademico: [''],
  dataNascimento: [{value: '', disabled: true}],
  tipoDocumento: [{value: '', disabled: true}],
  numDocumento: [{value: '', disabled: true}],
  notaExameAcesso: [''],
  regimeIngresso: [''],
  notaEnsinoMedio: [{value: '', disabled: true}],
  instituicaoAnterior: [{value: '', disabled: true}],
  dataIngresso: [{value: '', disabled: true}]
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
    
    this.perfilestudanteService.alterarSenha(senhaAtual, novaSenha).subscribe({
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
    this.carregarDadosEstudante();
     this.buscarEstudante();
  }
carregarDadosEstudante(): void {
  this.viestudanteService.getEstudante().subscribe({
    next: (resposta: any) => {
      if (resposta) {
        this.viestudante = {
          email: resposta.email || '',
          nome: resposta.nome || '',
          userDetails: {
            id: resposta.userDetails?.id || resposta.id || 0,
            contacto: resposta.userDetails?.contacto || resposta.contacto || '',
            endereco: resposta.userDetails?.endereco || resposta.endereco || '',
            dataNascimento: resposta.userDetails?.dataNascimento || '',
            numIdentificacao: resposta.userDetails?.numIdentificacao || '',
            tipoDocumento: resposta.userDetails?.tipoDocumento || '',
            anoAcademico: resposta.userDetails?.anoAcademico || 0,
            dataIngresso: resposta.userDetails?.dataIngresso || '',
            dataConclusao: resposta.userDetails?.dataConclusao || '',
            statusEstudante: resposta.userDetails?.statusEstudante || '',
            instituicaoAnterior: resposta.userDetails?.instituicaoAnterior || '',
            notaExameAcesso: resposta.userDetails?.notaExameAcesso || 0,
            notaEnsinoMedio: resposta.userDetails?.notaEnsinoMedio || 0,
            regimeIngresso: resposta.userDetails?.regimeIngresso || ''
          }
        };

        this.formulario.patchValue({
          email: this.viestudante['email'],
          contato: this.viestudante.userDetails.contacto,
          endereco: this.viestudante.userDetails.endereco,
          anoAcademico: this.viestudante.userDetails.anoAcademico,
          dataIngresso: this.viestudante.userDetails.dataIngresso,
          dataNascimento: this.viestudante.userDetails.dataNascimento,
          tipoDocumento: this.viestudante.userDetails.tipoDocumento,
          numDocumento: this.viestudante.userDetails.numIdentificacao,
          instituicaoAnterior: this.viestudante.userDetails.instituicaoAnterior,
          notaExameAcesso: this.viestudante.userDetails.notaExameAcesso,
          notaEnsinoMedio: this.viestudante.userDetails.notaEnsinoMedio,
          regimeIngresso: this.viestudante.userDetails.regimeIngresso
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

  if (!this.viestudante) {
    this.mensagemSucesso = 'Dados atualizados com sucesso!';
    return;
  }

  // Prepara os dados alterados
  const dadosAlterados: any = {};
  
  if (this.formulario.value.contato !== this.viestudante.userDetails.contacto) {
    dadosAlterados.contacto = this.formulario.value.contato;
  }
  
  if (this.formulario.value.endereco !== this.viestudante.userDetails.endereco) {
    dadosAlterados.endereco = this.formulario.value.endereco;
  }
  
  if (this.formulario.value.email !== this.viestudante['email']) {
    dadosAlterados.email = this.formulario.value.email;
  }

  // Verifica se há algo para atualizar
  if (Object.keys(dadosAlterados).length === 0) {
    this.mensagemErro = 'Nenhum dado foi alterado';
    return;
  }

  if (this.viestudante && this.viestudante.userDetails) {
    this.viestudanteService.atualizarPerfil(this.viestudante.userDetails.id, dadosAlterados)
      .subscribe({
        next: (resposta: any) => {
          // Atualiza os dados localmente
          if (this.viestudante) {
            if (dadosAlterados.contacto) this.viestudante.userDetails.contacto = dadosAlterados.contacto;
            if (dadosAlterados.endereco) this.viestudante.userDetails.endereco = dadosAlterados.endereco;
            if (dadosAlterados.email) this.viestudante['email'] = dadosAlterados.email;
          }
          
          // Mostra mensagem de sucesso
          this.mensagemSucesso = 'Dados atualizados com sucesso!';
          
          // Limpa a mensagem após 5 segundos
          setTimeout(() => {
            this.mensagemSucesso = '';
          }, 5000);
          
          // Recarrega os dados do estudante
          setTimeout(() => this.carregarDadosEstudante(), 1000);
        },
        error: (err: HttpErrorResponse) => {
          this.mensagemErro = `Erro ${err.status}: ${err.error?.message || err.message}`;
          
          // Limpa a mensagem de erro após 5 segundos
          setTimeout(() => {
            this.mensagemErro = '';
          }, 5000);
        }
      });
  } 
}
  buscarEstudante(): void {
    this.viestudanteService.getEstudante().subscribe({
      next: (data: Viestudante) => {
        this.estudanteSelecionado = data;
        this.errorMessage = null;
      },
      error: (err: { message: string }) => {
        console.error('Erro ao buscar estudante:', err);
        this.estudanteSelecionado = undefined;
      }
    });
  }

}


