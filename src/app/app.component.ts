import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DetalhesCadeirasComponent } from "./Admin-Secretaria/menu-admin/detalhes-cadeiras/detalhes-cadeiras.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DetalhesCadeirasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DepartamentoDEI';
}
