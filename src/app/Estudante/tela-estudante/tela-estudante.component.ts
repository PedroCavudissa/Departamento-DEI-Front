import { Component } from '@angular/core';
import { LateralComponent } from '../lateral/lateral.component';


@Component({
  selector: 'app-tela-estudante',
  standalone: true, 
  imports: [ LateralComponent],
  templateUrl: './tela-estudante.component.html',
  styleUrl: './tela-estudante.component.css',
})
export class TelaEstudanteComponent {}
