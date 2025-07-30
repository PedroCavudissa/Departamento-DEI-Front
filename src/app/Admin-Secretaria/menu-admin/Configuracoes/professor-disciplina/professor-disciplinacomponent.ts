import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from '../../../barralateral/barralateral.component';
import { FuncionarioCadeiraService, ProfessorDisciplina } from '../../../../services/funcionario-cadeira.service';
import { Disciplina, DisciplinaService } from '../../../../services/disciplina.service';
import { Professor } from '../../../../services/professor.service';
import { error } from 'jquery';
import { NotificationService } from '../../../../services/notification.service';
import { Funcionario } from '../../../../funcionario.service';

@Component({
  selector: 'app-professor-disciplina',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './professor-disciplina.component.html',
  styleUrls: ['./professor-disciplina.component.css']
})export class ProfessorDisciplinaComponent implements OnInit {
  modalAberto = false;

  novaAssociacao: ProfessorDisciplina = {
    id: 0,
    funcionarioNome: '',
    disciplinaNome: '',
    disciplinaId: 0
  };

  associacoes: ProfessorDisciplina[] = [];
  disciplinas: Disciplina[] = [];
  funcionarios: Funcionario[] = [];
  constructor(private service: FuncionarioCadeiraService,private notification: NotificationService,private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.carregarAssociacoes();
    this.carregarDisciplinas();
  }
  carregarAssociacoes(): void {
    this.service.listar().subscribe({
      next: (res) => {
        console.log('DADOS RECEBIDOS:', res);
        this.associacoes = res.content; 
      },
      error: (erro) => console.error('Erro ao listar associações:', erro)
    });
  }
  
  

  abrirModal(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.novaAssociacao = { id: 0, funcionarioNome: '', disciplinaNome: '', disciplinaId: 0 };
  }

  associarProfessor(): void {
    this.associacoes.push({ ...this.novaAssociacao });

    this.service.associar(this.novaAssociacao).subscribe({
      next: () => alert('Associação feita com sucesso'),
      error: err => console.error('Erro ao associar:', err)
    });

    this.fecharModal();
  }

  removerAssociacao(disciplinaId: number): void {
    const confirmacao = confirm('Tem certeza que deseja remover esta associação?');
    
    if (!confirmacao) {
      return;
    }
  
    this.service.remover(disciplinaId).subscribe({
      next: () => {
        this.associacoes = this.associacoes.filter(a => a.disciplinaId !== disciplinaId);
        this.notification.success('Removido com sucesso');
      },
      error: err => console.error('Erro ao remover:', err)
    });
  }
  
carregarDisciplinas(): void {
  this.disciplinaService.getDisciplinas().subscribe({
    next: data => {
      this.disciplinas = data;
    },
    error: err => {
      console.error('Erro ao carregar disciplinas:', err);
    }
  });
 
}


}