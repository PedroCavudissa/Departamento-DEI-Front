import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component';


@Component({
  selector: 'app-lancamento',
  standalone: true,
  imports: [CommonModule, FormsModule, LateralProfessorComponent],
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent {

}
