import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LateralComponent } from "../../Estudante/lateral/lateral.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfilprofe',
  imports: [LateralComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './perfilprofe.component.html',
  styleUrl: './perfilprofe.component.css'
})
export class PerfilprofeComponent {
  mostrarModal = false;
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contato: ['', Validators.required],
      idade: ['', Validators.required]
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarSenha() {
    alert('Senha alterada!');
    this.fecharModal();
  }

  accao() {
    if (this.formulario.valid) {
      alert("Dados atualizados com sucesso!");
      console.log(this.formulario.value);
 this.formulario.reset();
      
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}


