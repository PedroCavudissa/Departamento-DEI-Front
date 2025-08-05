import { Component, OnInit } from '@angular/core';
import { BarralateralComponent } from "../../barralateral/barralateral.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, forkJoin, of } from 'rxjs';

import { Disciplina, HorarioService, ProfessorDisciplina } from '../../../services/horario.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [
    BarralateralComponent, 
    CommonModule, 
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  exibirModal = false;
  novoHorario: any = {
    ano: new Date().getFullYear(),
    semestre: 1,
    horarios: this.inicializarGradeHoraria()
  };


  horariosCadastrados: any[] = [];
  horarioSelecionado: any = null;
  filtroAno: number | null = null;
  filtroSemestre: number | null = null;

  professores: ProfessorDisciplina[] = [];
  disciplinas: Disciplina[] = [];
  carregando = true;

  diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  horariosPredefinidos = [
    '7:30 - 8:20',
    '8:30 - 9:20',
    '9:40 - 10:30',
    '10:40 - 11:30',
    '11:40 - 12:30',
    '12:40 - 13:30',
    '14:00 - 14:35',
    '15:30 - 16:25',
    '17:30 - 18:05'
  ];

  constructor(private  horarioService: HorarioService,private notification: NotificationService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.carregando = true;
  
    forkJoin({
      profs: this.horarioService.getProfessores(),
      disc: this.horarioService.getDisciplinas()
    }).subscribe({
      next: (result) => {
        this.professores = result.profs;
        this.disciplinas = result.disc;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        alert('Erro ao carregar dados');
      }
    });
  
    this.horarioService.listarHorarios().subscribe({
      next: (horarios) => {
        this.horariosCadastrados = horarios;
      }
    });
  }
  

  inicializarGradeHoraria() {
    return this.horariosPredefinidos.map(() => 
      Array(this.diasSemana.length).fill(null)
    );
  }

  abrirModal() {
    this.novoHorario = {
      ano: new Date().getFullYear(),
      semestre: 1,
      horarios: this.inicializarGradeHoraria()
    };
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
  }

  salvarHorario() {
    const gradeCompleta = this.novoHorario.horarios.map((row: string[]) => {
      return row.map((sigla: string) => {
        const disc = this.disciplinas.find(d => d.sigla === sigla);
        const prof = this.professores.find(p => p.id === disc?.id);
        return sigla ? {
          sigla: disc?.sigla,
          nome: disc?.nome,
          professor: prof?.funcionarioNome || 'N/A'
        } : null;
      });
    });
  
    this.horarioService.salvarHorario({
      ...this.novoHorario,
      horarios: gradeCompleta
    }).subscribe({
      next: (res) => {
        this.notification.success('Horário salvo com sucesso!');
      },
      error: (err) => {
        this.notification.error('Erro ao salvar o horário'
        );
      }
    });
  }
  
  
  getHorariosFiltrados() {
    return this.horariosCadastrados.filter(horario => {
      const anoMatch = this.filtroAno ? horario.ano === this.filtroAno : true;
      const semestreMatch = this.filtroSemestre ? horario.semestre === this.filtroSemestre : true;
      return anoMatch && semestreMatch;
    });
  }

  selecionarHorario(horario: any) {
    this.horarioSelecionado = horario;
  }

  baixarHorario() {
    if (!this.horarioSelecionado) return;
  
    this.horarioService.baixarHorarioPdf(this.horarioSelecionado.id!).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `horario_${this.horarioSelecionado.ano}_S${this.horarioSelecionado.semestre}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
  

  getNomeProfessor(codigoDisciplina: string) {
    const disciplina = this.disciplinas.find(d => d.sigla === codigoDisciplina);
    if (!disciplina) return 'N/A';
    
    const professor = this.professores.find(p => p.id === disciplina.id);
    return professor ? professor.funcionarioNome : 'N/A';
  }
}