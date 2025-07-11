import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarralateralComponent } from "./barralateral/barralateral.component";

@Component({
  selector: 'app-root',



  imports: [RouterOutlet],


  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'DepartamentoDEI';
}

