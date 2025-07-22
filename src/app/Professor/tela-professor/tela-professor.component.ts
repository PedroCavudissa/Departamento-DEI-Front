
import { Component,OnInit, TemplateRef } from '@angular/core';
import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component'; 
import { CommonModule, NgIfContext } from '@angular/common';
import { Professor, ProfessorService } from '../../Services/professor.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tela-professor',
  imports: [LateralProfessorComponent, CommonModule, FormsModule],
  templateUrl: './tela-professor.component.html',
  styleUrl: './tela-professor.component.css'
})

export class TelaProfessorComponent implements OnInit  {

  professor: Professor[] = [];
  errorMessage: string | null = null;
  professorSelecionado: Professor| undefined;
  mensagem: string | undefined;

  mostrarPerfilModal = false;

abrirModalPerfil() {
  this.mostrarPerfilModal = true;
}

fecharPerfilModal() {
  this.mostrarPerfilModal = false;
}


  constructor(private professorService: ProfessorService) {}
  // Método ngOnInit para inicializar o componente
 
 ngOnInit(): void {
   
   this.buscarProfessor();
  }
   buscarProfessor(): void {
    this.professorService.getProfessor().subscribe({
      next: (data: Professor) => {
        this.professorSelecionado = data;
        this.errorMessage = null;
      },
      error: (err: { message: string }) => {
        console.error('Erro ao buscar professor:', err);
        this.errorMessage = err.message || 'Erro desconhecido ao buscar professor.';
        this.professorSelecionado = undefined;
      }
    });


  }}
  

