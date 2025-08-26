import { Component, OnInit } from '@angular/core';
import { BarralateralSecretariaComponent } from "../../barralateral-secretaria/barralateral-secretaria.component";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, isFormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { Professor, ProfessorService } from '../../../services/professor.service';
import { PerfiprofService } from '../../../services/perfiprof.service';
import { Funcionario } from '../../../services/cadastro.service';
@Component({
  selector: 'app-perfil-secretaria',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BarralateralSecretariaComponent
  ],
  templateUrl: './perfil-secretaria.component.html',
  styleUrls: ['./perfil-secretaria.component.css']
})
export class PerfilSecretariaComponent  implements OnInit  {

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