import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarralateralComponent } from "../../../barralateral/barralateral.component";
import { ProfessorService } from '../../../../services/professor.service';
import { Funcionario, FuncionarioService } from '../../../../services/cadastro.service';
import { PerfiprofService } from '../../../../services/perfiprof.service';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BarralateralComponent
  ],
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit {
  admin!: Funcionario;
  formulario: FormGroup;
  formularioSenha: FormGroup;
  usuarioSelecionado!: Funcionario;
  mostrarModal = false;
  mostrarMensagens = false;
  mensagemSucesso = '';
  mensagemErro = '';
  mensagemSucessoSenha = '';
  mensagemErroSenha = '';

  constructor(
    private fb: FormBuilder,
    private adminService: ProfessorService,
    private adm: PerfiprofService
  ) {
    // Formulário principal
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', [Validators.required, Validators.minLength(5)]],
      tipoDocumento: [{ value: '', disabled: true }],
      dataIngresso: [{ value: '', disabled: true }],
      dataNascimento: [{ value: '', disabled: true }],
      numDocumento: [{ value: '', disabled: true }],
      cargo: [{ value: '', disabled: true }],
      nivelAcademico: [{ value: '', disabled: true }]
    });

    // Formulário de senha
    this.formularioSenha = this.fb.group({
      senhaAtual: ['', Validators.required],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.confirmarSenhaValidator });
  }

  ngOnInit(): void {
    this.carregarPerfilAdmin();
  }

  carregarPerfilAdmin(): void {
    this.adminService.getPerfilUsuario().subscribe({
      next: (res: Funcionario) => {
        this.admin = res;
        this.usuarioSelecionado = res;

        this.formulario.patchValue({
          email: res.email,
          endereco: res.endereco,
          tipoDocumento: res.tipoDocumento,
          dataIngresso: res.dataIngresso,
          dataNascimento: res.dataNascimento,
          numDocumento: res.numDocumento,
          cargo: res.cargo,
          nivelAcademico: res.nivelAcademico
        });
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao carregar dados do administrador.';
        console.error(err);
      }
    });
  }

  accao(): void {
    this.mostrarMensagens = true;
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (this.formulario.invalid) {
      this.mensagemErro = 'Por favor, corrija os campos inválidos';
      this.formulario.markAllAsTouched();
      return;
    }

    const dadosAlterados: Partial<Funcionario> = {};

    if (this.formulario.value.email !== this.admin.email) {
      dadosAlterados.email = this.formulario.value.email;
    }

    if (this.formulario.value.endereco !== this.admin.endereco) {
      dadosAlterados.endereco = this.formulario.value.endereco;
    }

    if (Object.keys(dadosAlterados).length === 0) {
      this.mensagemErro = 'Nenhum dado foi alterado';
      return;
    }

    this.adminService.atualizarPerfil(this.admin.id!, dadosAlterados).subscribe({
      next: () => {
        this.mensagemSucesso = 'Dados atualizados com sucesso!';
        Object.assign(this.admin, dadosAlterados);
        setTimeout(() => this.mensagemSucesso = '', 3000);
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao atualizar dados.';
        console.error(err);
      }
    });
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
      this.mensagemErroSenha = 'Preencha todos os campos corretamente.';
      return;
    }

    const { senhaAtual, novaSenha } = this.formularioSenha.value;

    this.adm.alterarSenha(senhaAtual, novaSenha).subscribe({
      next: () => {
        this.mensagemSucessoSenha = 'Senha alterada com sucesso!';
        this.formularioSenha.reset();
        setTimeout(() => this.fecharModal(), 2000);
      },
      error: (err) => {
        this.mensagemErroSenha = 'Erro ao alterar senha.';
        console.error(err);
      }
    });
  }

  confirmarSenhaValidator(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('novaSenha')?.value;
    const confirmacao = group.get('confirmarSenha')?.value;
    return senha === confirmacao ? null : { senhasNaoCoincidem: true };
  }
}
