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
import { BarralateralComponent } from '../../../barralateral/barralateral.component';
import { ComunicadoComponent } from "../../comunicado/comunicado.component";
import { ComunicadosComponent } from "../comunicadosf/comunicadosF.component";



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
    BarralateralComponent,
    ComunicadoComponent,
    ComunicadosComponent
]
})
export class AprovarComunicadoComponent implements OnInit {
  comunicados: Comunicado[] = [];
  comunicadoEmEdicao: Partial<Comunicado> = this.novoComunicadoVazio();
  modoEdicao = false;
  carregando = false;
  colunasExibidas = ['titulo', 'status', 'destinatario', 'data', 'acoes'];
  filtroDestinatario = 'TODOS';

  destinatarios = [
    { valor: 'TODOS', exibicao: 'Todos' },
    { valor: 'PROFESSOR', exibicao: 'Professor' },
    { valor: 'ESTUDANTE', exibicao: 'Estudante' },
    { valor: 'SECRETARIA', exibicao: 'Secretaria' },
    { valor: 'ADMINISTRADOR', exibicao: 'Administrador' }
  ];

  constructor(
    private comunicadosService: ComunicadosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarComunicados();
  }

  // aprovar-comunicado.component.ts

// aprovar-comunicado.component.ts
carregarComunicados(): void {
  this.carregando = true;
  this.comunicados = [];

  const obs = this.filtroDestinatario === 'TODOS'
    ? this.comunicadosService.listar()
    : this.comunicadosService.filtrarPorDestinatario(this.filtroDestinatario);

  obs.subscribe({
    next: (data) => {
      this.comunicados = data;
      this.carregando = false;

      if (this.filtroDestinatario !== 'TODOS' && data.length === 0) {
        this.mostrarMensagem('Nenhum comunicado encontrado para este destinatário', 'warning');
      }
    },
    error: (err) => {
      console.error('Erro:', err);
      this.mostrarMensagem(err.message || 'Erro ao carregar comunicados', 'error');
      this.carregando = false;
    }
  });
}






aplicarFiltro(): void {
  this.carregando = true;
  this.comunicados = [];

  this.comunicadosService.filtrarPorDestinatario(this.filtroDestinatario).subscribe({
    next: (comunicados) => {
      this.comunicados = comunicados;
      this.carregando = false;

      if (this.filtroDestinatario !== 'TODOS' && comunicados.length === 0) {
        this.mostrarMensagem('Nenhum comunicado encontrado para este destinatário', 'warning');
      }
    },
    error: (err) => {
      console.error('Erro ao filtrar:', err);
      this.mostrarMensagem(err.message || 'Erro ao filtrar comunicados', 'error');
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
        console.error('Erro ao atualizar comunicado:', err);
        let mensagem = 'Erro ao atualizar comunicado';

        if (err.status === 500) {
          mensagem = 'Erro interno do servidor';
        } else if (err.status === 405) {
          mensagem = 'Método não permitido';
        }

        this.mostrarMensagem(mensagem, 'error', 8000);
        this.carregando = false;
      }
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
          console.error('Erro ao criar comunicado:', err);
          let mensagem = 'Erro ao criar comunicado';

          if (err.status === 405) {
            mensagem += ': Método não permitido pelo servidor';
          }

          this.mostrarMensagem(mensagem, 'error');
          this.carregando = false;
        }
      });
  }

  editar(comunicado: Comunicado): void {
    this.comunicadoEmEdicao = { ...comunicado };
    this.modoEdicao = true;

    setTimeout(() => {
      const form = document.getElementById('formulario-comunicado');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
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
          console.error('Erro ao excluir comunicado:', err);
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
    return status === 'VALIDO' ? 'status-valido' : 'status-invalido riscado';
  }

  private mostrarMensagem(mensagem: string, tipo: 'success' | 'error' | 'warning', duracao = 5000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      panelClass: [`snackbar-${tipo}`]
    });
  }

  testarRotaUpdate(): void {
    const testId = 1;
    const testData = {
      titulo: 'Teste de atualização',
      conteudo: 'Conteúdo de teste para atualização',
      noticeStatus: 'VALIDO',
      destinado: 'PROFESSOR',
      dataAcontecimento: new Date().toISOString()
    };

    this.comunicadosService.debugRequest(
      `${this.comunicadosService.API_URL}/update/${testId}`,
      'PUT',
      testData
    ).subscribe({
      next: (response) => {
        console.log('Resposta do debug:', response);
        this.mostrarMensagem('Rota testada com sucesso! Verifique o console.', 'success');
      },
      error: (err) => {
        console.error('Erro no teste da rota:', err);
        this.mostrarMensagem('Falha ao testar a rota. Veja o console.', 'error');
      }
    });
  }
}
