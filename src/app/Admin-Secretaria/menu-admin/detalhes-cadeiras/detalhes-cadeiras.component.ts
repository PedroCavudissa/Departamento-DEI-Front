import { Component, OnInit } from '@angular/core';
import { DisciplinaService, Disciplina } from '../../../Services/disciplina.service';
import { CommonModule } from '@angular/common';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-cadeiras',
  standalone: true,
  imports: [CommonModule, BarralateralComponent, FormsModule],
  templateUrl: './detalhes-cadeiras.component.html',
  styleUrl: './detalhes-cadeiras.component.css',
})
export class DetalhesCadeirasComponent implements OnInit {
  anoSelecionado = '';
  disciplinas: Disciplina[] = [];

  constructor(
    private disciplinaService: DisciplinaService) {}



  ngOnInit(): void {
  this.listarDisciplinas();
  }
  listarDisciplinas(){
    this.disciplinaService.listarDisciplinas().subscribe(disciplinas=>{
      this.disciplinas=disciplinas;
      console.log(this.disciplinas);
    })
  }
}

