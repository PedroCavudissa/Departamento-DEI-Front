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
  formulario: FormGroup;
  mensagemErro = '';
  mensagemSucesso = '';
  estudante?: Estudante;
/*
  constructor(
    private fb: FormBuilder,
    private perfilestudanteService: PerfilestudanteService,
    private estudanteService: EstudanteService // Injete corretamente o serviço
  ) {
    this.formulario = this.fb.group({
      contato: ['', Validators.required],
      endereco: ['', [Validators.required, Validators.minLength(5)]]
    });
  }*/
 constructor(
  private fb: FormBuilder,
  private estudanteService: EstudanteService
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
}
  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarSenha() {
    // Implemente conforme necessário
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
}
   
}



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
  formulario: FormGroup;
  mensagemErro = '';
  mensagemSucesso = '';
  estudante?: Estudante;
/*
  constructor(
    private fb: FormBuilder,
    private perfilestudanteService: PerfilestudanteService,
    private estudanteService: EstudanteService // Injete corretamente o serviço
  ) {
    this.formulario = this.fb.group({
      contato: ['', Validators.required],
      endereco: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
 constructor(
  private fb: FormBuilder,
  private estudanteService: EstudanteService
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
}
  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarSenha() {
    // Implemente conforme necessário
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
  if (this.formulario.invalid) {
    this.mensagemErro = 'Por favor, preencha todos os campos corretamente';
    this.formulario.markAllAsTouched();
    return;
  }

  if (!this.estudante) {
    this.mensagemErro = 'Dados do estudante não carregados';
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
}
   
}*/






























   /* this.estudanteService.alterarSenha('novaSenha').subscribe({
      next: () => {
        alert('Senha alterada com sucesso!');
        this.fecharModal();
      },
      error: (erro) => {
        console.error('Erro ao alterar senha:', erro);
        alert('Erro ao alterar senha');
      }
    });*/













