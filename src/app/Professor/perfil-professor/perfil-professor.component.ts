import { Component } from '@angular/core';
import { LateralProfessorComponent } from "../lateral-professor/lateral-professor.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Professor, ProfessorService } from '../../Services/professor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-professor',
  imports: [LateralProfessorComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-professor.component.html',
  styleUrl: './perfil-professor.component.css'
})
export class PerfilProfessorComponent {
 mostrarModal = false;
  formulario: FormGroup;
  mensagemErro = '';
  mensagemSucesso = '';
  professor?: Professor;

 constructor(
  private fb: FormBuilder,
  private professorService: ProfessorService
) {
  this.professor = {
    nome: '',
    userDetails: {
      id: 0,
      dataNascimento: '',
      numIdentificacao: '',
      tipoDocumento: '',
      endereco: '',
      contacto: '',
      anoAcademico: 0,
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
  this.professorService.getProfessor().subscribe({
    next: (resposta: any) => {
      console.log('Resposta completa:', resposta); // Debug
      
      // Verificação segura da estrutura
      if (resposta && (resposta.userDetails || resposta.contacto)) {
        this.professor = {
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
          contato: this.professor.userDetails.contacto,
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

accao(): void {
  if (this.formulario.invalid) {
    this.mensagemErro = 'Por favor, preencha todos os campos corretamente';
    this.formulario.markAllAsTouched();
    return;
  }

  if (!this.professor) {
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
  if (this.formulario.value.contato !== this.professor.userDetails.contacto) {
    dadosAlterados.contacto = this.formulario.value.contato;
  }
  if (this.formulario.value.endereco !== this.professor.userDetails.endereco) {
    dadosAlterados.endereco = this.formulario.value.endereco;
  }

  this.professorService.atualizarPerfil(this.professor.userDetails.id, dadosAlterados)
    .subscribe({
      next: (resposta: any) => {
        console.log('Resposta da atualização:', resposta); // Debug
        
        // Atualiza localmente apenas os campos alterados
        if (this.professor) {
          this.professor.userDetails.contacto = this.formulario.value.contato;
          this.professor.userDetails.endereco = this.formulario.value.endereco;
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

