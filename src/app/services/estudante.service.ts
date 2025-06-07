import { Injectable } from '@angular/core';

export interface Estudante {
  nome: string;
  dataNascimento: string;
  bi: string;
  endereco: string;
  telefone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {
  private dadosEstudante: Estudante | null = null;

  setDados(estudante: Estudante): void {
    this.dadosEstudante = estudante;
  }

  getDados(): Estudante | null {
    return this.dadosEstudante;
  }

  limparDados(): void {
    this.dadosEstudante = null;
  }
}
