import { Component } from '@angular/core';
import { LateralProfessorComponent } from '../Professor/lateral-professor/lateral-professor.component';
import { DetalhesCadeirasComponent } from "../Admin-Secretaria/menu-admin/detalhes-cadeiras/detalhes-cadeiras.component";

@Component({
  selector: 'app-horarios',
  imports: [LateralProfessorComponent, DetalhesCadeirasComponent],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent {

}
