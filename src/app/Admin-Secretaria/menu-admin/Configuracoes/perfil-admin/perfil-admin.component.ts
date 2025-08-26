import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarralateralComponent } from "../../../barralateral/barralateral.component";
import { Professor, ProfessorService } from '../../../../services/professor.service';
import { Funcionario, FuncionarioService } from '../../../../services/cadastro.service';
import { PerfiprofService } from '../../../../services/perfiprof.service';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BarralateralComponent
  ],
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit  {

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
    this.professorService.getPerfilUsuario().subscribe({
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


  }
}