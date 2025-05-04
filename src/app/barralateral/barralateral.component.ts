import { Component } from '@angular/core';


@Component({
  selector: 'app-barralateral',
  standalone: true,
  imports: [],
  templateUrl: './barralateral.component.html',
  styleUrls: ['./barralateral.component.css'] // ← aqui está o erro corrigido
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

