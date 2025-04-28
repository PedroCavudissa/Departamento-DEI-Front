import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-barralateral',
  imports: [RouterModule],
  templateUrl: './barralateral.component.html',
  styleUrl: './barralateral.component.css'
})
export class BarralateralComponent {
  menuAberto: boolean = false;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
  
}
