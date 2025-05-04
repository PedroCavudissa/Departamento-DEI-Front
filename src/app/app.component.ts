import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelaEstudanteComponent } from './Estudante/tela-estudante/tela-estudante.component';
import { LateralComponent } from './Estudante/lateral/lateral.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LateralComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DepartamentoDEI';
}
