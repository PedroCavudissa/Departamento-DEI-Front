import { Component } from '@angular/core';

@Component({
  selector: 'app-tela-funcionario',
  templateUrl: './TelaFuncionario.component.html',
  styleUrls: ['./TelaFuncionario.component.css'],
  standalone: true,
})
export class TelaFuncionarioComponent {
  // Definindo os dados do funcionário
  funcionario = {
    nome: 'Firmino Guerra',
    email: 'firmino.com',
    telefone: '+244 938233462',
    formacao: 'Mestrado em Engenharia Informática',
    instituicao: 'Universidade Agostinho Neto',
    anoConclusao: 2024,
    cargo: 'Chefe de Departamento',
    departamento: 'Engenharia Informática',
    dataIngresso: '01/03/2025',
  };
  fotoFuncionario: string = 'assets/imagens/funcionario.jpg';
}