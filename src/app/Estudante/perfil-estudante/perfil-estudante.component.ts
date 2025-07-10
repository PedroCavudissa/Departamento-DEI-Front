
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LateralComponent } from '../lateral/lateral.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilestudanteService } from '../../Services/perfilestudante.service';
import { Estudante, EstudanteService } from '../../Services/estudante.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-perfil-estudante',
  standalone: true,
  imports: [LateralComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-estudante.component.html',
  styleUrl: './perfil-estudante.component.css',
  providers: [EstudanteService, PerfilestudanteService]
})
export class PerfilEstudanteComponent implements OnInit {
  mostrarModal = false;
  mostrarMensagens = false; 
  formulario: FormGroup;
  mensagemErro = '';
  mensagemSucesso = '';
  mensagemErroSenha = '';
  mensagemSucessoSenha = '';
  estudante?: Estudante;
  formularioSenha: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estudanteService: EstudanteService,
    private perfilestudanteService: PerfilestudanteService
  ) {
    this.estudante = {
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
        statusEstudante: ''
      }
    };
    
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contato: ['', Validators.required],
      endereco: ['', [Validators.required, Validators.minLength(5)]],
     
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

  // Validador para idade mínima (parametrizável)
  validarIdadeMinima(idadeMinima: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const dataNasc = new Date(control.value);
      const hoje = new Date();
      let idade = hoje.getFullYear() - dataNasc.getFullYear();
      const mes = hoje.getMonth() - dataNasc.getMonth();
      
      if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
        idade--;
      }
      
      return idade >= idadeMinima ? null : { idadeMinima: true };
    };
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
  }

  carregarDadosEstudante(): void {
    this.estudanteService.getEstudante().subscribe({
      next: (resposta: any) => {
        if (resposta && (resposta.userDetails || resposta.contacto)) {
          this.estudante = {
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
              statusEstudante: resposta.userDetails?.statusEstudante || ''
            }
          };
          
          this.formulario.patchValue({
            email: resposta.email || '',
            contato: this.estudante.userDetails.contacto,
            endereco: this.estudante.userDetails.endereco,
            anoAcademico: this.estudante.userDetails.anoAcademico,
            dataIngresso: this.estudante.userDetails.dataIngresso,
            dataNascimento: this.estudante.userDetails.dataNascimento
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
  if (this.formulario.invalid) {
    this.mensagemErro = 'Por favor, preencha todos os campos corretamente';
    this.formulario.markAllAsTouched();
    return;
  }

  if (!this.estudante) {
    alert('Dados atualizados com sucesso!');
    return;
  }

  // Prepara os dados alterados
  const dadosAlterados: any = {};
  
  // Verifica cada campo para ver se foi alterado
  if (this.formulario.value.contato !== this.estudante.userDetails.contacto) {
    dadosAlterados.contacto = this.formulario.value.contato;
  }
  
  if (this.formulario.value.endereco !== this.estudante.userDetails.endereco) {
    dadosAlterados.endereco = this.formulario.value.endereco;
  }
  
  // Adiciona verificação para o email (assumindo que this.estudante.email contém o valor atual)
  if (this.formulario.value.email !== this.estudante['email']) {
    dadosAlterados.email = this.formulario.value.email;
  }

  // Adiciona outros campos se necessário
  if (this.formulario.value.anoAcademico !== this.estudante.userDetails.anoAcademico) {
    dadosAlterados.anoAcademico = this.formulario.value.anoAcademico;
  }
  
  if (this.formulario.value.dataIngresso !== this.estudante.userDetails.dataIngresso) {
    dadosAlterados.dataIngresso = this.formulario.value.dataIngresso;
  }
  
  if (this.formulario.value.dataNascimento !== this.estudante.userDetails.dataNascimento) {
    dadosAlterados.dataNascimento = this.formulario.value.dataNascimento;
  }

  // Verifica se há algo para atualizar
  if (Object.keys(dadosAlterados).length === 0) {
    this.mensagemErro = 'Nenhum dado foi alterado';
    return;
  }

  this.estudanteService.atualizarPerfil(this.estudante.userDetails.id, dadosAlterados)
    .subscribe({
      next: (resposta: any) => {
        console.log('Resposta da atualização:', resposta);
        
        // Atualiza localmente os campos alterados
        if (this.estudante) {
          if (dadosAlterados.contacto) this.estudante.userDetails.contacto = dadosAlterados.contacto;
          if (dadosAlterados.endereco) this.estudante.userDetails.endereco = dadosAlterados.endereco;
          if (dadosAlterados.email) this.estudante['email'] = dadosAlterados.email;
          if (dadosAlterados.anoAcademico) this.estudante.userDetails.anoAcademico = dadosAlterados.anoAcademico;
          if (dadosAlterados.dataIngresso) this.estudante.userDetails.dataIngresso = dadosAlterados.dataIngresso;
          if (dadosAlterados.dataNascimento) this.estudante.userDetails.dataNascimento = dadosAlterados.dataNascimento;
        }
        
        this.mensagemSucesso = 'Dados atualizados com sucesso!';
        
        setTimeout(() => this.carregarDadosEstudante(), 1000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro completo:', err);
        this.mensagemErro = `Erro ${err.status}: ${err.error?.message || err.message}`;
      }
    });
}}




/*
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LateralComponent } from '../lateral/lateral.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PerfilestudanteService } from '../../Services/perfilestudante.service';
import { Estudante, EstudanteService } from '../../Services/estudante.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-perfil-estudante',
  standalone: true,
  imports: [LateralComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-estudante.component.html',
  styleUrl: './perfil-estudante.component.css',
  providers: [EstudanteService, PerfilestudanteService] // Adicione os serviços aqui
})
export class PerfilEstudanteComponent implements OnInit {
  mostrarModal = false;
   mostrarMensagens = false; 
  formulario: FormGroup;
  mensagemErro = '';
  mensagemSucesso = '';
   mensagemErroSenha = '';
  mensagemSucessoSenha = '';
  estudante?: Estudante;
  formularioSenha: FormGroup; // Novo formulário para senha



 constructor(
  private fb: FormBuilder,
  private estudanteService: EstudanteService,
  private perfilestudanteService: PerfilestudanteService

) {
  this.estudante = {
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
      statusEstudante: ''
    }
  };
  
  this.formulario = this.fb.group({
    contato: ['', Validators.required],
    endereco: ['', [Validators.required, Validators.minLength(5)]]
  });

 // Novo formulário para alteração de senha
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

  abrirModal() {
    this.mostrarModal = true;
     this.formularioSenha.reset(); // Limpa o formulário ao abrir
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
      // Se a resposta for texto ou JSON
      const successMessage = typeof response === 'string' ? response : 'Senha alterada com sucesso!';
      this.mensagemSucessoSenha = successMessage;
      this.formularioSenha.reset();
      setTimeout(() => this.fecharModal(), 2000);
    },
    error: (err) => {
      console.error('Erro completo:', err);
      // Tenta pegar a mensagem de erro mesmo em respostas não-JSON
      this.mensagemErroSenha = err.error.text || err.error || 'Erro ao alterar senha';
    }
  });
}

  ngOnInit(): void {
    this.carregarDadosEstudante();
  }


   carregarDadosEstudante(): void {
  this.estudanteService.getEstudante().subscribe({
    next: (resposta: any) => {
      console.log('Resposta completa:', resposta); // Debug
      
      // Verificação segura da estrutura
      if (resposta && (resposta.userDetails || resposta.contacto)) {
        this.estudante = {
          nome: resposta.nome || '',
          userDetails: {
            id: resposta.userDetails?.id || resposta.id || 0,
            contacto: resposta.userDetails?.contacto || resposta.contacto || '',
            endereco: resposta.userDetails?.endereco || resposta.endereco || '',
            // Outros campos com fallback
            dataNascimento: resposta.userDetails?.dataNascimento || '',
            numIdentificacao: resposta.userDetails?.numIdentificacao || '',
            tipoDocumento: resposta.userDetails?.tipoDocumento || '',
            anoAcademico: resposta.userDetails?.anoAcademico || 0,
            dataIngresso: resposta.userDetails?.dataIngresso || '',
            dataConclusao: resposta.userDetails?.dataConclusao || '',
            statusEstudante: resposta.userDetails?.statusEstudante || ''
          }
        };
        
        this.formulario.patchValue({
          contato: this.estudante.userDetails.contacto,
          endereco: this.estudante.userDetails.endereco
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
  // Resetar mensagens antes de começar
  this.mostrarMensagens = false;
  this.mensagemSucesso = '';
  this.mensagemErro = '';

  if (this.formulario.invalid) {
    this.mensagemErro = 'Por favor, preencha todos os campos corretamente';
    this.mostrarMensagens = true;
    this.formulario.markAllAsTouched();
    return;
  }

  if (!this.estudante) {
    this.mensagemSucesso = 'Dados atualizados com sucesso!';
    this.mostrarMensagens = true;
    return;
  }

  const dadosAlterados: any = {};
  if (this.formulario.value.contato !== this.estudante.userDetails.contacto) {
    dadosAlterados.contacto = this.formulario.value.contato;
  }
  if (this.formulario.value.endereco !== this.estudante.userDetails.endereco) {
    dadosAlterados.endereco = this.formulario.value.endereco;
  }

  this.estudanteService.atualizarPerfil(this.estudante.userDetails.id, dadosAlterados)
    .subscribe({
      next: (resposta: any) => {
        if (this.estudante) {
          this.estudante.userDetails.contacto = this.formulario.value.contato;
          this.estudante.userDetails.endereco = this.formulario.value.endereco;
        }
        
        this.mensagemSucesso = 'Dados atualizados com sucesso!';
        this.mostrarMensagens = true;
        
        // Esconder as mensagens após 5 segundos
        setTimeout(() => {
          this.mostrarMensagens = false;
        }, 5000);
        
        setTimeout(() => this.carregarDadosEstudante(), 1000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro completo:', err);
        this.mensagemErro = `Erro ${err.status}: ${err.error?.message || err.message}`;
        this.mostrarMensagens = true;
        
        // Esconder a mensagem de erro após 5 segundos
        setTimeout(() => {
          this.mostrarMensagens = false;
        }, 5000);
      }
    });
}
}*/




/*
accao(): void {
  if (this.formulario.invalid) {
    this.mensagemErro = 'Por favor, preencha todos os campos corretamente';
    this.formulario.markAllAsTouched();
    return;
  }

  if (!this.estudante) {
  alert('Dados atualizados com sucesso!');

    return;
  }

  // Cria payload mínimo necessário para a API
  const payload = {
    contacto: this.formulario.value.contato,
    endereco: this.formulario.value.endereco
  };

  // Alternativa: enviar só o que foi alterado
  const dadosAlterados: any = {};
  if (this.formulario.value.contato !== this.estudante.userDetails.contacto) {
    dadosAlterados.contacto = this.formulario.value.contato;
  }
  if (this.formulario.value.endereco !== this.estudante.userDetails.endereco) {
    dadosAlterados.endereco = this.formulario.value.endereco;
  }

  this.estudanteService.atualizarPerfil(this.estudante.userDetails.id, dadosAlterados)
    .subscribe({
      next: (resposta: any) => {
        console.log('Resposta da atualização:', resposta); // Debug
        
        // Atualiza localmente apenas os campos alterados
        if (this.estudante) {
          this.estudante.userDetails.contacto = this.formulario.value.contato;
          this.estudante.userDetails.endereco = this.formulario.value.endereco;
        }
        
        this.mensagemSucesso = 'Dados atualizados com sucesso!';
        
        // Opcional: recarregar dados completos
        setTimeout(() => this.carregarDadosEstudante(), 1000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro completo:', err);
        this.mensagemErro = `Erro ${err.status}: ${err.error?.message || err.message}`;
      }
    });
}*/