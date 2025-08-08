import { Component, OnInit } from '@angular/core';
import { HorarioItem, HorarioService, Turma } from '../../services/horario.service';
import { Disciplina, DisciplinaService } from '../../services/disciplina.service';
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LateralProfessorComponent } from '../lateral-professor/lateral-professor.component';

@Component({
  selector: 'app-horario-professor',
  imports: [LateralProfessorComponent,FormsModule, CommonModule],
  templateUrl: './horario-professor.component.html',
  styleUrl: './horario-professor.component.css'
})
export class HorarioProfessorComponent implements OnInit {


  diasSemana = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
  horariosUnicos: string[] = [];
  grade: any[] = [];

  disciplinas: Disciplina[] = [];           
  disciplinaSelecionada: string = '';       

  anoLetivo = 2025;
  semestreSelecionado: number | null = null;
  turmaSelecionada = '';

  turmas: Turma[] = [];
  private cacheHorarios: HorarioItem[] = [];

  mostrarModal = false;

  novoHorario = {
    turmaSigla: '',
    disciplinaSigla: '',
    diaSemana: '',
    horaInicio: '',
    horaFim: '',
    anoLetivo: new Date().getFullYear(),
    semestre: 1
  };


  horarios = [
  { inicio: '07:30', fim: '08:20' },
  { inicio: '08:30', fim: '09:20' },
  { inicio: '09:40', fim: '10:30' },
  { inicio: '10:40', fim: '11:30' },
  { inicio: '11:40', fim: '12:30' },
  { inicio: '12:40', fim: '13:30' },
  { inicio: '13:00', fim: '13:45' },
  { inicio: '13:50', fim: '14:35' },
  { inicio: '14:40', fim: '15:25' },
  { inicio: '15:40', fim: '16:25' },
  { inicio: '16:30', fim: '17:15' },
  { inicio: '17:20', fim: '18:05' }
];

  constructor(
    private horarioService: HorarioService,
    private disciplinaService: DisciplinaService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.carregarTurmas();
    this.carregarTodosHorarios();
    this.carregarDisciplinas(); // busca disciplinas da API

    this.turmaSelecionada = 'T1';
    this.semestreSelecionado = 1;
  }

  private carregarTodosHorarios() {
    this.horarioService.getGradeHoraria().subscribe({
      next: (data) => {
        this.cacheHorarios = data || [];
        if (this.turmaSelecionada && this.semestreSelecionado) {
          this.aplicarFiltros();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar todos os horários:', err);
        this.cacheHorarios = [];
      }
    });
  }

  carregarTurmas() {
    this.horarioService.getTurmas().subscribe({
      next: (data) => {
        this.turmas = data || [];
      },
      error: (err) => {
        console.error('Erro ao carregar turmas:', err);
        this.turmas = [];
      }
    });
  }

  carregarDisciplinas() {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (data) => {
        this.disciplinas = data || [];
      },
      error: (err) => {
        console.error('Erro ao carregar disciplinas:', err);
        this.disciplinas = [];
      }
    });
  }

  aplicarFiltros() {
    if (!this.turmaSelecionada || !this.semestreSelecionado) {
      this.grade = [];
      this.horariosUnicos = [];
      return;
    }

    const filtrados = this.cacheHorarios.filter(h =>
      String(h.turmaSigla).trim() === String(this.turmaSelecionada).trim() &&
      Number(h.semestre) === Number(this.semestreSelecionado) &&
      Number(h.anoLetivo) === Number(this.anoLetivo)
    );

    this.montarGrade(filtrados);
  }

  montarGrade(horariosTurma: HorarioItem[]) {
    if (!horariosTurma || horariosTurma.length === 0) {
      this.horariosUnicos = [];
      this.grade = [];
      return;
    }

    const horariosSet = Array.from(new Set(horariosTurma.map(h => (h.horarioFormatado || '').trim())));
    const parseStartMinutes = (range: string) => {
      const start = (range.split(' - ')[0] || '').trim();
      const [hh, mm] = start.split(':').map(s => parseInt(s, 10) || 0);
      return hh * 60 + mm;
    };
    this.horariosUnicos = horariosSet.sort((a, b) => parseStartMinutes(a) - parseStartMinutes(b));

    this.grade = this.horariosUnicos.map(horario => {
      const linha: any = { horario };
      this.diasSemana.forEach(dia => {
        const encontrado = horariosTurma.find(h =>
          String(h.diaSemana).trim().toUpperCase() === String(dia).trim().toUpperCase() &&
          String(h.horarioFormatado).trim() === String(horario).trim()
        );
        linha[dia] = encontrado ? encontrado.disciplinaSigla : '';
      });
      return linha;
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarHorario() {
    console.log('Salvando horário:', this.novoHorario);
    if (!this.novoHorario.turmaSigla || !this.novoHorario.disciplinaSigla ||
        !this.novoHorario.diaSemana || !this.novoHorario.horaInicio || !this.novoHorario.horaFim) {
      this.notificationService.error('Preencha todos os campos obrigatórios!');
      return;
    }
  
    this.horarioService.cadastrarHorario(this.novoHorario).subscribe({
      next: () => {
        this.notificationService.success('Horário adicionado com sucesso!');
        this.fecharModal();
        this.carregarTodosHorarios();
      },
      error: (err) => {
        this.notificationService.error('Erro ao adicionar horário!');
        console.error(err);
      }
    });
  }
}
