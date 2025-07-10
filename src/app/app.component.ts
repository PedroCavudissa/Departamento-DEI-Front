import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LateralComponent } from "./Estudante/lateral/lateral.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LateralComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ 'styleUrls' está correto
})
export class AppComponent {
  title = 'DepartamentoDEI';
}

