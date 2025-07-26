import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acesso-negado',
  imports: [],
  templateUrl: './acesso-negado.component.html',
  styleUrl: './acesso-negado.component.css'
})
export class AcessoNegadoComponent {
  constructor(private router: Router) {}
redirectToLogin() {
  this.router.navigate(['/login']);
}
}
