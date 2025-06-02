import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../../../Services/disciplina.service';
import { CommonModule } from '@angular/common';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalhes-cadeiras',
  standalone: true,
  imports: [CommonModule, BarralateralComponent, FormsModule],
  templateUrl: './detalhes-cadeiras.component.html',
  styleUrl: './detalhes-cadeiras.component.css',
})
export class DetalhesCadeirasComponent implements OnInit {
  anoSelecionado = '';
  disciplinas: Disciplina[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log(' ngOnInit chamado');
    this.listarDisciplinas();
  }

  listarDisciplinas(): void {
    console.log('📡 Chamando listarDisciplinas()');
    const url = 'https://4118-102-214-36-111.ngrok-free.app/api/disciplina/list';
    
    this.http.get<Disciplina[]>(url).subscribe({
      next: (data) => {
        console.log(' Dados recebidos:', data);
        this.disciplinas = data;
      },
      error: (err) => {
        console.error(' Erro ao buscar disciplinas:', err);
     
        console.error('Conteúdo da resposta:', err.error);
      }
    });
  }
 
    }

