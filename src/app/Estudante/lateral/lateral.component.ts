import { Component } from '@angular/core';


@Component({
  selector: 'app-lateral',
  standalone: true, 
  imports: [],
  templateUrl: './lateral.component.html',
  styleUrl: './lateral.component.css'
})
export class LateralComponent {
  titulo = 'Olá, Pedro José Cavudissa' ;
  menuAtivo: boolean = false;

  toggleMenu(): void {
    this.menuAtivo = !this.menuAtivo;
   
  
  }

  selecionarMenu(novoTitulo: string) {
    this.titulo = novoTitulo;
    this.menuAtivo = false;
   
  }
}
