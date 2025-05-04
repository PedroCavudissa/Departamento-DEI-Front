import { Component } from '@angular/core';
import { LateralComponent } from '../lateral/lateral.component';

@Component({
  selector: 'app-tela-notas',
  standalone:true,
  imports: [LateralComponent],
  templateUrl: './tela-notas.component.html',
  styleUrl: './tela-notas.component.css'
})
export class TelaNotasComponent {

}
