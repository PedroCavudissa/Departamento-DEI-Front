import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
 templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ 'styleUrls' está correto
})
export class AppComponent {
  title = 'DepartamentoDEI';
}

