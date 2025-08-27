import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {  NavigationEnd } from '@angular/router';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { LoginService } from '../services/login.service';
import { NotificationService } from '../services/notification.service';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-login',
  standalone: true, // define como standalone
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private notification: NotificationService,
    private usuarioService: UsuarioService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        this.mostrarSidebar = event.url !== '/login';
      }
    });
  }

  

 notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'top',
  },
});

  mostrarSidebar = true;
  mensagemLogin = '';
  tipoMensagem: 'erro' | 'sucesso' | '' = '';
  mostrarModal = false;
  recuperarForm!: FormGroup;
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });

    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    

localStorage.removeItem('token');
}
// Senha esquecida
  abrirModal(event: Event) {
      event.preventDefault();
    this.mostrarModal = true;
}
fecharModal() {
  this.mostrarModal = false;
}
alterarSenha(){}
entrar() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    this.notification.error('Preencha todos os campos corretamente.');
    return;
  }

  const usuario = {
    email: this.loginForm.get('email')?.value,
    password: this.loginForm.get('senha')?.value
  };

  this.loginService.entrar(usuario).subscribe({
    next: (res: any) => {
      const usuarioLogado = {
        token: res.token,
        email: res.email,
        role: res.role,
        mustChangePassword: res.mustChangePassword
      };

      localStorage.setItem('usuario', JSON.stringify(usuarioLogado));

      // Redirecionar conforme o perfil
      switch (res.role) {
        case 'ADMINISTRADOR': this.router.navigate(['/menu-admin']); break;
        case 'SECRETARIA': this.router.navigate(['/menu-secretaria']); break;
        case 'PROFESSOR': this.router.navigate(['/tela-professor']); break;
        case 'ESTUDANTE': this.router.navigate(['/tela-estudante']); break;
        default: this.router.navigate(['/login']);
      }

      this.notification.success('Login realizado com sucesso!');
    },
    error: (err) => {
      console.error('Erro ao logar:', err);

      // Mensagens especificas
      const msgApi = err.error?.message || '';

      if (msgApi.includes('Usuário não encontrado')) {
        this.notification.error('Este e-mail não está cadastrado.');
      } else if (msgApi.includes('Senha incorreta')) {
        this.notification.error('Senha incorreta. Tente novamente.');
      } else if (err.status === 0) {
        this.notification.error('Falha de conexão com o servidor.');
      } else {
        this.notification.error('E-mail ou senha inválidos.');
      }
    }
  });
}


recuperar(): void {
  if (this.recuperarForm.invalid) {
    this.recuperarForm.markAllAsTouched();
    this.notification.error('Informe um e-mail válido.');
    return;
  }

  const email = this.recuperarForm.get('email')?.value;

  this.usuarioService.enviarEmail(email).subscribe({
    next: () => {
      this.notification.success('Verifique sua caixa de e-mail para redefinir a senha.');
      this.fecharModal();
    },
    error: (err) => {
      console.error('Erro ao enviar e-mail:', err);
      const msgApi = err.error?.message || '';

      if (msgApi.includes('E-mail não encontrado')) {
        this.notification.error('Este e-mail não está cadastrado.');
      } else if (err.status === 0) {
        this.notification.error('Não foi possível conectar ao servidor.');
      } else {
        this.notification.error('Erro ao enviar o e-mail de recuperação.');
      }
    }
  });
}



}