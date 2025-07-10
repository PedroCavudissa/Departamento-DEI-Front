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
  formularioSenha: FormGroup;

 

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
              endereco: resposta.userDetails?.endereco || resposta.endereco || '',
              dataNascimento: resposta.userDetails?.dataNascimento || '',
              numDocumento: resposta.userDetails?.numIdentificacao || '',
              tipoDocumento: resposta.userDetails?.tipoDocumento || '',
              nivelAcademico: resposta.userDetails?.nivelAcademico || '',
              dataIngresso: resposta.userDetails?.dataIngresso || '',
              cargo: resposta.userDetails?.cargo || '',
              curriculo: resposta.userDetails?.curriculo || '',
            }
          };
          
          this.formulario.patchValue({
            email: resposta.email || '',
            endereco: this.professor.userDetails.endereco,
            cargo: this.professor.userDetails.cargo,
            nivelAcademico: this.professor.userDetails.nivelAcademico,
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
  if (this.formulario.invalid) {
    this.mensagemErro = 'Por favor, preencha todos os campos corretamente';
    this.formulario.markAllAsTouched();
    return;
  }

  if (!this.professor) {
    alert('Dados atualizados com sucesso!');
    return;
  }

  // Prepara os dados alterados
  const dadosAlterados: any = {};
  
  // Verifica cada campo para ver se foi alterado
  
  
  if (this.formulario.value.endereco !== this.professor.userDetails.endereco) {
    dadosAlterados.endereco = this.formulario.value.endereco;
  }
  
  // Adiciona verificação para o email (assumindo que this.estudante.email contém o valor atual)
  if (this.formulario.value.email !== this.professor['email']) {
    dadosAlterados.email = this.formulario.value.email;
  }

  // Adiciona outros campos se necessário
  if (this.formulario.value.nivelAcademico !== this.professor.userDetails.nivelAcademico) {
    dadosAlterados.anoAcademico = this.formulario.value.anoAcademico;
  }
  
  if (this.formulario.value.dataIngresso !== this.professor.userDetails.dataIngresso) {
    dadosAlterados.dataIngresso = this.formulario.value.dataIngresso;
  }
  
  if (this.formulario.value.dataNascimento !== this.professor.userDetails.dataNascimento) {
    dadosAlterados.dataNascimento = this.formulario.value.dataNascimento;
  }

  // Verifica se há algo para atualizar
  if (Object.keys(dadosAlterados).length === 0) {
    this.mensagemErro = 'Nenhum dado foi alterado';
    return;
  }

  this.professorService.atualizarPerfil(this.professor.userDetails.id, dadosAlterados)
    .subscribe({
      next: (resposta: any) => {
        console.log('Resposta da atualização:', resposta);
        
        // Atualiza localmente os campos alterados
        if (this.professor) {
          
          if (dadosAlterados.endereco) this.professor.userDetails.endereco = dadosAlterados.endereco;
          if (dadosAlterados.email) this.professor['email'] = dadosAlterados.email;
          if (dadosAlterados.anoAcademico) this.professor.userDetails.nivelAcademico = dadosAlterados.anoAcademico;
          if (dadosAlterados.dataIngresso) this.professor.userDetails.dataIngresso = dadosAlterados.dataIngresso;
          if (dadosAlterados.dataNascimento) this.professor.userDetails.dataNascimento = dadosAlterados.dataNascimento;
        }
        
        this.mensagemSucesso = 'Dados atualizados com sucesso!';
        
        setTimeout(() => this.carregarDadosProfessor(), 1000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro completo:', err);
        this.mensagemErro = `Erro ${err.status}: ${err.error?.message || err.message}`;
      }
    });
}}






