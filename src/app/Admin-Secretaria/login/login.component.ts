import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {  NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true, // define como standalone
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent implements OnInit {
  
  mostrarSidebar = true;
  mensagemLogin = '';
tipoMensagem: 'erro' | 'sucesso' | '' = '';
mostrarModal = false;
recuperarForm!: FormGroup;


  // Valores válidos 
  private emailValido = 'admin@teste.com';
  private senhaValida = '123456';

private emailValidos = 'estudante@teste.com';
private senhaValidas = '123456';

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Oculta a sidebar apenas no login
        this.mostrarSidebar = event.url !== '/login';
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  this.recuperarForm = this.fb.group({
    gmail: ['', [Validators.required, Validators.email]]
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

continuarRecuperacao() {
  if (this.recuperarForm.valid) {
    const email = this.recuperarForm.get('gmail')?.value;
    console.log("Redirecionar com email:", email);
    this.mostrarModal = false;
    this.router.navigate(['/recuperar-senha']); // Ajuste o caminho conforme sua rota
  } else {
    this.recuperarForm.markAllAsTouched();
  }
}
  

  entrar() {
    if (this.loginForm.valid) {
      const emailDigitado = this.loginForm.get('username')?.value;
      const senhaDigitada = this.loginForm.get('password')?.value;

      if (emailDigitado === this.emailValido && senhaDigitada === this.senhaValida) {
       alert("Login Realizado Com Sucesso");
        this.tipoMensagem = 'sucesso';
        this.router.navigate(['/menu']);
      } else if(emailDigitado === this.emailValidos && senhaDigitada === this.senhaValidas){
        this.mensagemLogin = 'Login realizado com sucesso!';
       this.tipoMensagem = 'sucesso';
        this.router.navigate(['/tela-estudante']);
      }
      else
      {
        this.mensagemLogin = 'E-mail ou Senha Incorreto!';
        this.tipoMensagem = 'erro';
      }
    } else {
         this.loginForm.markAllAsTouched(); // ativa mensagens de erro nos campos
         this.mensagemLogin = '';
      this.tipoMensagem = '';
    }
  }

  
}