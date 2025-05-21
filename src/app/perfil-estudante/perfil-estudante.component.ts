import { Component } from '@angular/core';
import { LateralComponent } from '../lateral/lateral.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-estudante',
  imports: [LateralComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-estudante.component.html',
  styleUrl: './perfil-estudante.component.css'
})
export class PerfilEstudanteComponent {
   

//altera senha 
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
}
 
