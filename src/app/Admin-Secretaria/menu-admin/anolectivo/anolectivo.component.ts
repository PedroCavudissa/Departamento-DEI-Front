import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from '../../barralateral/barralateral.component';


@Component({
  selector: 'app-anolectivo',
  standalone: true,
  imports: [FormsModule, BarralateralComponent],
  templateUrl: './anolectivo.component.html',
  styleUrls: ['./anolectivo.component.css']
})
export class AnolectivoComponent {
  anoLetivo = {
    classe: '',
    curso: 'Engenharia Informática',
    anoIngresso: '',
    turno: ''
    
  };

  constructor(private router: Router) {}

  autoCompletarAno() {
  const valor = this.anoLetivo.anoIngresso;

  if (/^\d{4}\/\d{4}$/.test(valor)) return; // já está formatado corretamente

  if (/^\d{4}$/.test(valor)) {
    const ano = parseInt(valor, 10);
    if (!isNaN(ano)) {
      this.anoLetivo.anoIngresso = `${ano}/${ano + 1}`;
    }
  }
}

  salvarTudo() {
    // Aqui você pode pegar os dados do localStorage ou serviço depois
    const dadosCadastro = JSON.parse(localStorage.getItem('cadastro') || '{}');

    const dadosCompletos = {
      ...dadosCadastro,
      anoLetivo: this.anoLetivo
    };

     

    const resumo = `
Cadastro concluído com sucesso!

       Dados Pessoais:
- Nome: ${dadosCompletos.nome}
- Data de Nascimento: ${dadosCompletos.dataNascimento}
- Nº do BI: ${dadosCompletos.bi}
- Endereço: ${dadosCompletos.endereco}
- Telefone: ${dadosCompletos.telefone}
- Email: ${dadosCompletos.email}


       Ano Letivo:
- Ano: ${dadosCompletos.anoLetivo?.classe}
- Curso: ${dadosCompletos.anoLetivo?.curso}
- Ano de Ingresso: ${dadosCompletos.anoLetivo?.anoIngresso}
- Turno: ${dadosCompletos.anoLetivo?.turno}
`;

alert(resumo);

    // Limpar os dados do localStorage
    localStorage.removeItem('cadastro');
  }
}

