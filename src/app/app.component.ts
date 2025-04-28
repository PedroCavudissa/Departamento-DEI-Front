import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarralateralComponent } from "./barralateral/barralateral.component";




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarralateralComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DepartamentoDEI';
}
