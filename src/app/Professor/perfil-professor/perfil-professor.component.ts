import { Component } from '@angular/core';
import { LateralProfessorComponent } from "../lateral-professor/lateral-professor.component";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Professor, ProfessorService } from '../../Services/professor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PerfiprofService } from '../../Services/perfiprof.service';

@Component({
  selector: 'app-perfil-professor',
  imports: [LateralProfessorComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-professor.component.html',
  styleUrl: './perfil-professor.component.css',
  providers: [ProfessorService, PerfiprofService] // Adicione os serviços aqui
})
export class PerfilProfessorComponent {
  mostrarModal = false;
   mostrarMensagens = false; 
   formulario: FormGroup;
   mensagemErro = '';
   mensagemSucesso = '';
    mensagemErroSenha = '';
   mensagemSucessoSenha = '';
   professor?: Professor;
   formularioSenha: FormGroup; // Novo formulário para senha

 

   constructor(
    private fb: FormBuilder,
    private professorService: ProfessorService,
    private perfiprofService: PerfiprofService
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
        dataIngresso: '',
        dataConclusao: '',
        statusEstudante: ''
      }
    };
    
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contato: ['', Validators.required],
      endereco: ['', [Validators.required, Validators.minLength(5)]],
      anoAcademico: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
      dataIngresso: ['', [Validators.required, this.validarDataNaoFutura]],
      dataNascimento: ['', [Validators.required, this.validarDataNaoFutura, this.validarIdadeMinima(16)]]
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
    
    this.perfiprofService.alterarSenha(senhaAtual, novaSenha).subscribe({
      next: (response: any) => {
        const successMessage = typeof response === 'string' ? response : 'Senha alterada com sucesso!';
        this.mensagemSucessoSenha = successMessage;
        this.formularioSenha.reset();
        setTimeout(() => this.fecharModal(), 2000);
      },
      error: (err: { error: { text: any; }; }) => {
        console.error('Erro completo:', err);
        this.mensagemErroSenha = err.error.text || err.error || 'Erro ao alterar senha';
      }
    });
  }

  ngOnInit(): void {
    this.carregarDadosProfessor();
  }

  carregarDadosProfessor(): void {
    this.professorService.getProfessor().subscribe({
      next: (resposta: any) => {
        if (resposta && (resposta.userDetails || resposta.contacto)) {
          this.professor = {
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
            contato: this.professor.userDetails.contacto,
            endereco: this.professor.userDetails.endereco,
            anoAcademico: this.professor.userDetails.anoAcademico,
            dataIngresso: this.professor.userDetails.dataIngresso,
            dataNascimento: this.professor.userDetails.dataNascimento
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
    this.mostrarMensagens = false;
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (this.formulario.invalid) {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente';
      this.mostrarMensagens = true;
      this.formulario.markAllAsTouched();
      return;
    }

    if (!this.professor) {
      this.mensagemSucesso = 'Dados atualizados com sucesso!';
      this.mostrarMensagens = true;
      return;
    }

    const dadosAlterados: any = {};
    const campos = ['email', 'contato', 'endereco', 'anoAcademico', 'dataIngresso', 'dataNascimento'];
    
    campos.forEach(campo => {
      if (this.formulario.value[campo] !== this.professor?.userDetails[campo as keyof typeof this.professor.userDetails]) {
        dadosAlterados[campo] = this.formulario.value[campo];
      }
    });

    this.professorService.atualizarPerfil(this.professor.userDetails.id, dadosAlterados)
      .subscribe({
        next: (resposta: any) => {
          if (this.professor) {
            campos.forEach(campo => {
              if (dadosAlterados[campo] !== undefined) {
                (this.professor!.userDetails as any)[campo] = dadosAlterados[campo];
              }
            });
          }
          
          this.mensagemSucesso = 'Dados atualizados com sucesso!';
          this.mostrarMensagens = true;
          
          setTimeout(() => {
            this.mostrarMensagens = false;
          }, 5000);
          
          setTimeout(() => this.carregarDadosProfessor(), 1000);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro completo:', err);
          this.mensagemErro = `Erro ${err.status}: ${err.error?.message || err.message}`;
          this.mostrarMensagens = true;
          
          setTimeout(() => {
            this.mostrarMensagens = false;
          }, 5000);
        }
      });
  }
}





