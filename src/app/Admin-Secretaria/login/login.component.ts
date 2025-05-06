import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {  NavigationEnd } from '@angular/router';
import { BarralateralComponent } from "../../barralateral/barralateral.component";

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
  private emailValido = 'admin@gmail.com';
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
    if (this.loginForm.valid) {
      const emailDigitado = this.loginForm.get('username')?.value;
      const senhaDigitada = this.loginForm.get('password')?.value;

      if (emailDigitado === this.emailValido && senhaDigitada === this.senhaValida) {
        alert('Login realizado com sucesso!');
        this.router.navigate(['/menu']);
      } else if(emailDigitado === this.emailValidos && senhaDigitada === this.senhaValidas){
        alert('Login realizado com sucesso!');
        this.router.navigate(['/tela-estudante']);
      }
      else
      
      {

  
        alert('E-mail ou senha incorretos.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
      this.loginForm.markAllAsTouched(); // ativa mensagens de erro nos campos
    }
  }
}
