import { Component, OnInit } from '@angular/core';
import { LateralProfessorComponent } from "../lateral-professor/lateral-professor.component";
import { ComunicadoService } from '../../services/comunicado.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comunicado } from '../../models/comunicado.model';
import { RouterModule } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-comunicado-professor',
  standalone: true,
  imports: [FormsModule,CommonModule,LateralProfessorComponent,RouterModule],
  templateUrl: './comunicado-professor.component.html',
  styleUrl: './comunicado-professor.component.css'
})

export class ComunicadoProfessorComponent implements OnInit {
  comunicados: Comunicado[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private comunicadoService: ComunicadoService) {}

  ngOnInit(): void {
    this.carregarComunicados();
  }

  carregarComunicados(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.comunicadoService.getTodosComunicados().subscribe({
      next: (data: Comunicado[]) => {
        this.comunicados = data;
        this.isLoading = false;
      },
      error: (err: unknown) => {
        this.isLoading = false;
        this.handleError(err);
      }
    });
  }

  private handleError(err: unknown): void {
    console.error('Erro no componente:', err);

    if (this.isHtmlResponseError(err)) {
      this.errorMessage = 'Erro na comunicação com o servidor. Tente novamente mais tarde.';
    } else if (err instanceof Error && err.message.includes('Token')) {
      this.errorMessage = 'Sessão expirada. Por favor, faça login novamente.';
    } else if (err instanceof HttpErrorResponse) {
      this.errorMessage = err.message || 'Erro ao carregar comunicados.';
    } else {
      this.errorMessage = 'Ocorreu um erro desconhecido.';
    }
  }

  private isHtmlResponseError(err: unknown): boolean {
    if (typeof err === 'object' && err !== null && 'error' in err) {
      const errorObj = err as { error?: unknown };
      return typeof errorObj.error === 'string' && errorObj.error.includes('<html');
    }
    return false;
  }

  getStatusClass(status: 'VALIDO' | 'INVALIDO'): string {
    return status === 'VALIDO' ? 'status-valid' : 'status-invalid';
  }
}
