import { Component } from '@angular/core';
import { BarralateralconfirmacaoComponent } from "../../barralateralconfirmacao/barralateralconfirmacao.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao1',
  imports: [BarralateralconfirmacaoComponent],
  templateUrl: './confirmacao1.component.html',
  styleUrl: './confirmacao1.component.css'
})
export class Confirmacao1Component {
  constructor(private router: Router) {}

confi2() {
  this.router.navigate(['/confirmacao2']);
}

}
