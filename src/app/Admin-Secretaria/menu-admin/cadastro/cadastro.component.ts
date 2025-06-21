import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EstudanteService, Estudante } from '../../../services/estudante.service';
import { BarralateralComponent } from '../../barralateral/barralateral.component';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule,FormsModule, BarralateralComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  estudante: Estudante = {
    nome: '',
    dataNascimento: '',
    bi: '',
    endereco: '',
    telefone: '',
    email: ''
  };

  constructor(
    private router: Router,
    private estudanteService: EstudanteService
  ) {}

  avancar(): void {
    this.estudanteService.setDados(this.estudante);
    localStorage.setItem('cadastro', JSON.stringify(this.estudante));
    this.router.navigate(['/anolectivo']);
  }

  formatarData(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > 2) valor = valor.slice(0, 2) + '/' + valor.slice(2);
    if (valor.length > 5) valor = valor.slice(0, 5) + '/' + valor.slice(5, 9);
    input.value = valor;
    this.estudante.dataNascimento = valor;
  }
}
