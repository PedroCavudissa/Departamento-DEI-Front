import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarralateralComponent } from '../../../barralateral/barralateral.component';

@Component({
  selector: 'app-gerir-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './GerirPerfil.component.html',
  styleUrls: ['./GerirPerfil.component.css']
})
export class GerirPerfilComponent {
  showConfirmationDialog = false;
  currentEstudante: any = null;
  selectedStatus: string = '';
  previousStatus: string = '';
  dialogMessage: string = '';

  estudantes = [
    { nome: 'Firmino', numero: '2021001', acesso: 'Ativo' },
    { nome: 'Panzo', numero: '2021004', acesso: 'Inativo' },
    { nome: 'Odete', numero: '2021005', acesso: 'Inativo' },
    { nome: 'Pedro', numero: '2021006', acesso: 'Ativo' },
    { nome: 'Núria', numero: '2021007', acesso: 'Ativo' }
  ];

  onStatusChange(estudante: any, newStatus: string): void {
    if (estudante.acesso !== newStatus) {
      this.currentEstudante = estudante;
      this.selectedStatus = newStatus;
      this.previousStatus = estudante.acesso;
      
      this.dialogMessage = `Tens certeza que deseja alterar o status de acesso de <strong>${estudante.nome}</strong> de ${estudante.acesso} para ${newStatus}?`;
      this.showConfirmationDialog = true;
    }
  }

  confirmStatusChange(): void {
    if (this.currentEstudante) {
      this.currentEstudante.acesso = this.selectedStatus;
      this.showConfirmationDialog = false;
    }
  }

  cancelStatusChange(): void {
    if (this.currentEstudante) {
      this.currentEstudante.acesso = this.previousStatus;
    }
    this.showConfirmationDialog = false;
  }
}