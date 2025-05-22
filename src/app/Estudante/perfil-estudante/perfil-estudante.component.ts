import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LateralComponent } from '../lateral/lateral.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-estudante',
  standalone: true,
  imports: [LateralComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-estudante.component.html',
  styleUrl: './perfil-estudante.component.css'
})
export class PerfilEstudanteComponent {
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


 

















/*altera senha 
    mostrarModal = false;

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarSenha() {
    // lógica de salvar a nova senha
   /// console.log
   alert ('Senha alterada!');
    this.fecharModal();
  }
  // actualizar dados 
  accao(){

    alert("dados actualizados")
  }
    */
 
