import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {  NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true, // define como standalone
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent implements OnInit {
  
  mostrarSidebar = true;


  // Valores válidos (você pode mudar aqui)
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
  }

  entrar() {
<<<<<<< HEAD:src/app/pages/login/login.component.ts

=======
>>>>>>> Dev:src/app/Admin-Secretaria/login/login.component.ts
    if (this.loginForm.valid) {
      const emailDigitado = this.loginForm.get('username')?.value;
      const senhaDigitada = this.loginForm.get('password')?.value;

      if (emailDigitado === this.emailValido && senhaDigitada === this.senhaValida) {
        alert('Login realizado com sucesso!');
<<<<<<< HEAD:src/app/pages/login/login.component.ts

      } else {
=======
        this.router.navigate(['/menu']);
      } else if(emailDigitado === this.emailValidos && senhaDigitada === this.senhaValidas){
        alert('Login realizado com sucesso!');
        this.router.navigate(['/tela-estudante']);
      }
      else
      
      {

  
>>>>>>> Dev:src/app/Admin-Secretaria/login/login.component.ts
        alert('E-mail ou senha incorretos.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
      this.loginForm.markAllAsTouched(); // ativa mensagens de erro nos campos
    }
  }
}
