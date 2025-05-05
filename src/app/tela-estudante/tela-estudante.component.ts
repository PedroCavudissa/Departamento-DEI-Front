import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { LateralComponent } from "../lateral/lateral.component";
import { BarralateralComponent } from "../barralateral/barralateral.component";

@Component({
  selector: 'app-tela-estudante',
  imports: [HeaderComponent, BarralateralComponent, LateralComponent],
  templateUrl: './tela-estudante.component.html',
  styleUrl: './tela-estudante.component.css'
})
export class TelaEstudanteComponent {

}
