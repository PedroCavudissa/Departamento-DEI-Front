import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barralateral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barralateral.component.html',
  styleUrls: ['./barralateral.component.css']
})
export class BarralateralComponent {
  titulo = 'Dados Gerais';

  selecionarMenu(novoTitulo: string) {
    this.titulo = novoTitulo;
  }
}
