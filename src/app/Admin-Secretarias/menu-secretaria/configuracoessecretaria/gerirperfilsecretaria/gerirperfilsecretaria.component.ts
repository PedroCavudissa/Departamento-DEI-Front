import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerirperfilsecretaria',
  imports: [FormsModule,CommonModule],
  templateUrl: './gerirperfilsecretaria.component.html',
  styleUrl: './gerirperfilsecretaria.component.css'
})
export class GerirperfilsecretariaComponent {
  estudantes = [
    { nome: 'Firmino', numero: '2021001', acesso: 'Ativo' },
    { nome: 'Panzo', numero: '2021004', acesso: 'Inativo' },
    { nome: 'Odete', numero: '2021005', acesso: 'Inativo' },
    {nome: 'Pedro', numero: '2021006', acesso: 'Ativo'},
    {nome: 'Núria', numero: '2021007', acesso: 'Ativo'}
  ];
 
  redefinirSenha(estudante: any): void {
    alert('Senha redefinida para: ' + estudante.nome);
  }
}
