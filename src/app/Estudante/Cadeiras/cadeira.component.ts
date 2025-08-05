import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LateralComponent } from "../lateral/lateral.component";
import {  CadeirasService, DisciplinaEmAtraso } from "../../services/cadeiras.service";


@Component({
  selector: 'app-cadeira',
  standalone: true,
  imports: [CommonModule, FormsModule, LateralComponent],
  templateUrl: './cadeira.component.html',
  styleUrls: ['./cadeira.component.css']
})
export class CadeiraComponent implements OnInit {
  disciplinas: DisciplinaEmAtraso[] = [];
  carregouComSucesso = false;
  mensagem = ''; // Para armazenar a mensagem de texto do backend
  constructor(private disciplinaService: CadeirasService) {}

  ngOnInit(): void {
    this.carregarDisciplinas();
  }

  

 carregarDisciplinas(): void {
  this.disciplinaService.getDisciplinasEmAtraso().subscribe({
    next: (res: DisciplinaEmAtraso[] | string) => {
      console.log('Resposta recebida:', res);

      if (Array.isArray(res)) {
        this.disciplinas = res;
        this.mensagem = '';
      } else {
        this.disciplinas = [];
        this.mensagem = res; // Guardar a string retornada pelo backend
      }

      this.carregouComSucesso = true;
    },
    error: (erro) => {
      console.error('Erro ao buscar disciplinas em atraso:', erro);
      this.carregouComSucesso = false;
      this.mensagem = 'Erro ao carregar as disciplinas.';
    }
   });
  }
}
