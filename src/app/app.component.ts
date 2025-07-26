import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LateralComponent } from "./Estudante/lateral/lateral.component";


@Component({
  selector: 'app-root',

  imports: [RouterOutlet],
 templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 

})
export class AppComponent {
  title = 'Departamento-DEI';
}

