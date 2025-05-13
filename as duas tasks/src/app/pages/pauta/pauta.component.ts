import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BarralateralComponent } from '../../barralateral/barralateral.component';

@Component({
  selector: 'app-pauta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BarralateralComponent],
  templateUrl: './pauta.component.html',
  styleUrls: ['./pauta.component.css']
})
export class PautaComponent {
  categoriaSelecionada = '3º ano';

  constructor(private router: Router) {}

  alunos = [
    { nome: 'Alfredo Kindal', ac1: 7.0, ac2: 0.9, pt: 8.0, pe: 18.0, ms: 5.5, rs: 'CIM' },
    { nome: 'Ana Edivânia da Silva Capita', ac1: 16.0, ac2: 17.0, pt: 15.0, pe: 14.0, ms: 15.5, rs: 'AP' },
    { nome: 'David Orlando A. Almeida Tomás', ac1: 7.0, ac2: 11.0, pt: 10.0, pe: 13.0, ms: 10.3, rs: 'CIM' },
    { nome: 'Firmino da Silva Guerra', ac1: 12.0, ac2: 14.0, pt: 14.0, pe: 12.0, ms: 13.0, rs: 'AP' },
    { nome: 'Firmino Sofulano Sayengana', ac1: 14.0, ac2: 15.0, pt: 13.0, pe: 12.0, ms: 13.5, rs: 'AP' },
    { nome: 'Frederico Nanima Jerica', ac1: 12.0, ac2: 15.0, pt: 13.0, pe: 12.0, ms: 13.0, rs: 'AP' },
    { nome: 'Isabel Teixeira', ac1: 14.0, ac2: 15.0, pt: 13.0, pe: 12.0, ms: 13.5, rs: 'AP' },
    { nome: 'Kesia Marelis dos Santos', ac1: 12.0, ac2: 14.0, pt: 14.0, pe: 12.0, ms: 13.0, rs: 'AP' },
    { nome: 'Luis Alberto  Domingos', ac1: 14.0, ac2: 15.0, pt: 13.0, pe: 12.0, ms: 13.5, rs: 'AP' },
    { nome: 'Nunes Pascal Gomes ', ac1: 12.0, ac2: 13.0, pt: 14.0, pe: 11.0, ms: 12.5, rs: 'AP' },
    { nome: 'Odete Vieira Mangumbala', ac1: 16.0, ac2: 11.0, pt: 12.0, pe: 13.0, ms: 13.0, rs: 'CIM' }
  ];

  pedirRevisao() {
    this.router.navigate(['/chat'], {
      queryParams: {
        destinatario: 'Ms. Panzo Rafael Chiló',
        assunto: 'Revisão de Pauta >'
      }
    });
  }
}
