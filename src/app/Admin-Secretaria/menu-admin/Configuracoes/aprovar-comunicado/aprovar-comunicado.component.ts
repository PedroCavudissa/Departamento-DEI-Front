import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComunicadosService } from '../../../../services/comunicados.service';
import { Comunicado, NovoComunicado } from '../../../../models/comunicados.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BarralateralComponent } from "../../../barralateral/barralateral.component";
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-aprovar-comunicado',
  templateUrl: './aprovar-comunicado.component.html',
  styleUrls: ['./aprovar-comunicado.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    BarralateralComponent
]
})
export class AprovarComunicadoComponent implements OnInit {
  comunicados: Comunicado[] = [];
  comunicadoEmEdicao: Partial<Comunicado> = this.novoComunicadoVazio();
  modoEdicao = false;
  carregando = false;
  colunasExibidas = ['titulo', 'status', 'destinatario', 'data', 'acoes'];

  constructor(
    private comunicadosService: ComunicadosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarComunicados();
  }

  carregarComunicados(): void {
    this.carregando = true;
    this.comunicadosService.listar().subscribe({
      next: (data) => {
        this.comunicados = data;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar:', err);
        this.mostrarMensagem('Erro ao carregar comunicados', 'error');
        this.carregando = false;
      }
    });
  }

  salvar(): void {
    if (!this.validarFormulario()) return;

    this.carregando = true;

    if (this.modoEdicao && this.comunicadoEmEdicao.id) {
      this.atualizarComunicado();
    } else {
      this.criarComunicado();
    }
  }
private atualizarComunicado(): void {
  if (!this.comunicadoEmEdicao.id) {
    this.mostrarMensagem('ID do comunicado não encontrado', 'error');
    return;
  }

  this.carregando = true;

  this.comunicadosService.atualizar(
    this.comunicadoEmEdicao.id,
    this.comunicadoEmEdicao as Comunicado
  ).subscribe({
    next: () => {
      this.mostrarMensagem('Comunicado atualizado com sucesso!', 'success');
      this.carregarComunicados();
      this.limparFormulario();
    },
    error: (err) => {
      console.error('Erro completo:', err);

      let mensagem = 'Falha na atualização';
      if (err.status === 500) {
        mensagem = 'Erro no servidor - verifique os dados ou contate o suporte';
      } else if (err.status === 405) {
        mensagem = 'Método não permitido - atualização falhou';
      }

      this.mostrarMensagem(mensagem, 'error', 8000);
      this.carregando = false;
    }
  });
}

private mostrarMensagem(mensagem: string, tipo: 'success'|'error'|'warning', duracao = 5000) {
  this.snackBar.open(mensagem, 'Fechar', {
    duration: duracao,
    panelClass: [`snackbar-${tipo}`]
  });
}


  private criarComunicado(): void {
    this.comunicadosService.criar(this.comunicadoEmEdicao as NovoComunicado)
      .subscribe({
        next: () => {
          this.mostrarMensagem('Comunicado criado com sucesso!', 'success');
          this.carregarComunicados();
          this.limparFormulario();
        },
        error: (err) => {
          console.error('Erro na criação:', err);
          let mensagem = 'Falha ao criar comunicado';

          if (err.status === 405) {
            mensagem += ': Método não permitido pelo servidor';
          }

          this.mostrarMensagem(mensagem, 'error');
          this.carregando = false;
        }
      });
  }

  // Método para testar a rota manualmente (pode ser chamado temporariamente)
  testarRotaUpdate(): void {
    const testId = 1; // Use um ID que exista
    const testData = {
      titulo: 'Teste de atualização',
      conteudo: 'Conteúdo de teste para atualização',
      noticeStatus: 'VALIDO',
      destinado: 'PROFESSOR',
      dataAcontecimento: new Date().toISOString()
    };

    this.comunicadosService.debugRequest(
      `${environment.apiUrl}/update/${testId}`,
      'PUT',
      testData
    ).subscribe({
      next: (response) => {
        console.log('Resposta do debug:', response);
        this.mostrarMensagem('Rota testada com sucesso! Verifique o console.', 'success');
      },
      error: (err) => {
        console.error('Erro no debug:', err);
        this.mostrarMensagem('Falha no teste da rota. Verifique o console.', 'error');
      }
    });
  }

  editar(comunicado: Comunicado): void {
    this.comunicadoEmEdicao = { ...comunicado };
    this.modoEdicao = true;
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este comunicado?')) {
      this.carregando = true;
      this.comunicadosService.remover(id).subscribe({
        next: () => {
          this.mostrarMensagem('Comunicado excluído com sucesso!', 'success');
          this.comunicados = this.comunicados.filter(c => c.id !== id);
          this.carregando = false;
        },
        error: (err) => {
          console.error('Erro ao excluir:', err);
          this.mostrarMensagem('Erro ao excluir comunicado', 'error');
          this.carregando = false;
        }
      });
    }
  }

  limparFormulario(): void {
    this.comunicadoEmEdicao = this.novoComunicadoVazio();
    this.modoEdicao = false;
    this.carregando = false;
  }

  private novoComunicadoVazio(): Partial<Comunicado> {
    return {
      titulo: '',
      conteudo: '',
      noticeStatus: 'VALIDO',
      destinado: 'PROFESSOR',
      dataAcontecimento: new Date().toISOString().split('T')[0]
    };
  }

  private validarFormulario(): boolean {
    if (!this.comunicadoEmEdicao.titulo?.trim()) {
      this.mostrarMensagem('O título é obrigatório', 'warning');
      return false;
    }
    if (!this.comunicadoEmEdicao.conteudo?.trim()) {
      this.mostrarMensagem('O conteúdo é obrigatório', 'warning');
      return false;
    }
    return true;
  }



  getStatusClass(status: 'VALIDO' | 'INVALIDO'): string {
    return status === 'VALIDO' ? 'status-valido' : 'status-invalido';
  }
}
