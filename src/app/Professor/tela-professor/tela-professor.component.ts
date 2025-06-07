import { Component } from '@angular/core';
import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component'; 
import { CommonModule } from '@angular/common';
import { Professor } from '../../interfaceprof/professor.interface';
import { ProfessorService } from '../../servicoProfessore/professor.service';


@Component({
  selector: 'app-tela-professor',
  imports: [LateralProfessorComponent,CommonModule],
  templateUrl: './tela-professor.component.html',
  styleUrl: './tela-professor.component.css'
})
export class TelaProfessorComponent {


 professores: Professor[] = [];
  errorMessage: string | null = null;
  professorSelecionado: Professor | undefined;
 

  constructor(private professorService: ProfessorService) {}
  // Método ngOnInit para inicializar o componente
  ngOnInit(): void {
    // Substitua '1' pelo ID real do estudante que deseja buscar
    this.buscarProfessorPorId(1);
  }
  buscarProfessorPorId(id: number): void {
  this.professorService.getProfessorById(id).subscribe({
    next: (data: Professor | undefined) => {
      this.professorSelecionado = data;
      this.errorMessage = null;
    },
    error: (err: { message: string; }) => {
      console.error('Erro ao buscar estudante por ID:', err);
      this.errorMessage = err.message || 'Erro desconhecido ao buscar estudante por ID.';
      this.professorSelecionado = undefined;
    }
  });
}













  /*
  professores: Professore[]=[];
   errorMessage: string | null = null;
   professoreSelecionado:Professor| undefined;
 
   constructor(private profService: ProfService) {}
    
  estudantes: Estudante[] = [];
  errorMessage: string | null = null;
  estudanteSelecionado: Estudante | undefined;
 // Método ngOnInit para inicializar o componente
  ngOnInit(): void {
    // Substitua '1' pelo ID real do estudante que deseja buscar
    this.buscarEstudantePorId(2);
  }


  buscarEstudantePorId(id: number): void {
  this.estudanteService.getEstudanteById(id).subscribe({
    next: (data) => {
      this.estudanteSelecionado = data;
      this.errorMessage = null;
    },
    error: (err) => {
      console.error('Erro ao buscar estudante por ID:', err);
      this.errorMessage = err.message || 'Erro desconhecido ao buscar estudante por ID.';
      this.estudanteSelecionado = undefined;
    }
  });
}*/
  }
