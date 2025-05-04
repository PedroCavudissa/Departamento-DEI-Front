import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true, // define como standalone
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  // Valores válidos (você pode mudar aqui)
  private emailValido = 'firmino@gmail.com';
  private senhaValida = '123456';

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  entrar() {
    if (this.loginForm.valid) {
      const emailDigitado = this.loginForm.get('username')?.value;
      const senhaDigitada = this.loginForm.get('password')?.value;

      if (emailDigitado === this.emailValido && senhaDigitada === this.senhaValida) {
        alert('Login realizado com sucesso!');
        this.router.navigate(['/tela-funcionario']); // Redireciona para a tela de funcionário
      } else {
        alert('E-mail ou senha incorretos.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
      this.loginForm.markAllAsTouched(); // ativa mensagens de erro nos campos
    }
  }
}
