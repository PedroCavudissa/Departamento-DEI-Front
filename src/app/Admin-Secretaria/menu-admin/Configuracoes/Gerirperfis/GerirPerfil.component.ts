import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarralateralComponent } from '../../../barralateral/barralateral.component';

@Component({
  selector: 'app-gerir-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule,BarralateralComponent],
  templateUrl: './GerirPerfil.component.html',
  styleUrls: ['./GerirPerfil.component.css']
})
export class GerirPerfilComponent {
  sidebarVisible = false;
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  estudantes = [
    { nome: 'Firmino', numero: '2021001', acesso: 'Ativo' },
    { nome: 'Panzo', numero: '2021004', acesso: 'Inativo' },
    { nome: 'Odete', numero: '2021005', acesso: 'Inativo' },
    {nome: 'Pedro', numero: '2021006', acesso: 'Ativo'},
    {nome: 'Núria', numero: '2021007', acesso: 'Ativo'}
  ];
 
  redefinirSenha(estudante: { nome: string, numero: string, acesso: string }): void {
    alert('Senha redefinida para: ' + estudante.nome);
  }
  
}