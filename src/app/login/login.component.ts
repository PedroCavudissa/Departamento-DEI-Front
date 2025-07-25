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
  if (this.loginForm.valid) {
    const usuario = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('senha')?.value
    };

    this.loginService.entrar(usuario).subscribe({
      next: (res: unknown) => {
        const response = res as { token: string; email: string; role: string };
        
        // Armazenar APENAS o objeto completo
        const usuarioLogado = {
          token: response.token,
          email: response.email,
          role: response.role
        };
        localStorage.setItem('usuario', JSON.stringify(usuarioLogado));       
        this.notification.success('Login realizado com sucesso!');

      

        const role = response.role;
        switch (role) {
          case 'ADMINISTRADOR':
            this.router.navigate(['/menu-admin']);
            break;
          case 'SECRETARIA':
            this.router.navigate(['/menu-secretaria']);
            break;
          case 'PROFESSOR':
            this.router.navigate(['/tela-professor']);
            break;
          case 'ESTUDANTE':
            this.router.navigate(['/tela-estudante']);
            break;
          default:
            this.router.navigate(['/']);
        }
      },
      error: (error: unknown) => {
        console.error('Erro ao logar:', error);
        this.notification.error('E-mail ou senha inválidos');
      }
    });

  } else {
    this.loginForm.markAllAsTouched();
    this.notification.error('Preencha todos os campos corretamente.');
  }
}



recuperar(): void {
  console.log('Tentando recuperar...');
  if (this.recuperarForm.invalid) {
    this.recuperarForm.markAllAsTouched();
    console.error('Formulário inválido');
    return;
  }

  const email = this.recuperarForm.get('email')?.value;
  this.usuarioService.enviarEmail(email).subscribe({
    next: () => {
      this.notification.success('Verifique a sua caixa de email!');
      this.fecharModal();
    },
    error: () => {
      this.notification.error('Erro ao enviar o email de recuperação.');
    }
  });
}


}