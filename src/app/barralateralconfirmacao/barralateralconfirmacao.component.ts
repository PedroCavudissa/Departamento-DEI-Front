import { Component } from '@angular/core';

@Component({
  selector: 'app-barralateralconfirmacao',
  imports: [],
  templateUrl: './barralateralconfirmacao.component.html',
  styleUrl: './barralateralconfirmacao.component.css'
})
export class BarralateralconfirmacaoComponent {
  titulo = 'Área Administtiva';
  menuAtivo: boolean = false;

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
   
  
  }

  selecionarMenu(novoTitulo: string) {
    this.titulo = novoTitulo;
    this.menuAtivo = false;
   
  }
}
