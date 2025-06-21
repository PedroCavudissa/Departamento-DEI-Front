import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // aqui você pode incluir FormsModule também se quiser
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ corrigido: 'styleUrls' com "s"
})
export class AppComponent {
  title = 'DepartamentoDEI';
}
