import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LateralComponent } from '../lateral/lateral.component';

@Component({
  selector: 'app-confirmacao1',
  imports: [LateralComponent],
  templateUrl: './confirmacao1.component.html',
  styleUrl: './confirmacao1.component.css'
})
export class Confirmacao1Component {
  constructor(private router: Router) {}

confi2() {
  this.router.navigate(['/confirmacao2']);
}

}