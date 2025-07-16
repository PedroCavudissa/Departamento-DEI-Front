import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {  NavigationEnd } from '@angular/router';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { LoginService } from '../services/login.service';



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
    private loginService: LoginService
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
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });


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
        this.notyf.success('Login realizado com sucesso!');

        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', response.email);

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
        this.notyf.error('E-mail ou senha inválidos');
      }
    });

  } else {
    this.loginForm.markAllAsTouched();
    this.notyf.error('Preencha todos os campos corretamente.');
  }
}



recuperar(): void {
  if (this.recuperarForm.invalid) {
    this.recuperarForm.markAllAsTouched();
    this.notyf.success('Verifique a sua caixa de email!');
      this.fecharModal();
    return;

  }
  const email = this.recuperarForm.get('email')?.value;
 
 


}
}