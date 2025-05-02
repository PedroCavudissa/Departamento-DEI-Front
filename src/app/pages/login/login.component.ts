import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}

  entrar() {
    // Chamada da tela de Menu
    alert("Seja Bem Vindo")
    this.router.navigate(['/menu']); // redireciona para o menu
  }
}
