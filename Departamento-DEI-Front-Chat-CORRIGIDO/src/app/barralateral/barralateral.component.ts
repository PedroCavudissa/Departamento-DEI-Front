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
  menuAtivo: boolean = false;

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
  }

  selecionarMenu(novoTitulo: string) {
    this.titulo = novoTitulo;
    this.menuAtivo = false;
  }
}