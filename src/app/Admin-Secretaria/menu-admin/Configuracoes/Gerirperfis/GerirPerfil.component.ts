import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from '../../../barralateral/barralateral.component';
import { UsuarioService } from '../../../../services/usuario.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-gerir-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './GerirPerfil.component.html',
  styleUrls: ['./GerirPerfil.component.css']
})
export class GerirPerfilComponent implements OnInit {
  usuarios: any[] = [];
  filtroRole: string = '';
  carregando = true;

  constructor(
    private usuarioService: UsuarioService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.carregando = true;
    this.usuarioService.listarUsuarios().subscribe({
      next: (response) => {
        if (Array.isArray(response?.content)) {
          this.usuarios = response.content;
        } else {
          this.usuarios = [];
          console.error('Formato inesperado da resposta:', response);
        }
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.notification.error('Falha ao carregar lista de usuários');
        this.carregando = false;
      }
    });
  }

  usuariosFiltrados() {
    return this.filtroRole
      ? this.usuarios.filter(u => u.role === this.filtroRole)
      : this.usuarios;
  }

  alternarAcesso(usuario: any) {
    const confirmacao = confirm(`Tem certeza que deseja ${usuario.active ? 'desativar' : 'ativar'} o acesso deste usuário?`);
    if (!confirmacao) return;
  
    const novoEstado = !usuario.active;
    const estadoOriginal = usuario.active; // Guarda o estado original para reversão
    
    // Atualização otimista
    usuario.active = novoEstado;
    
    this.usuarioService.atualizarStatusUsuario(usuario.id, novoEstado).subscribe({
      next: () => {
        this.notification.success(`Usuário ${novoEstado ? 'ativado' : 'desativado'} com sucesso!`);
      },
      error: (error) => {
        console.error('Erro completo ao alternar estado:', error);
        
        // Reverte visualmente em caso de erro
        usuario.active = estadoOriginal;
        
        let mensagemErro = 'Falha ao atualizar o status do usuário.';
        
        // Verifica se há detalhes no corpo do erro
        if (error.error && error.error.message) {
          mensagemErro += ` Motivo: ${error.error.message}`;
        } else if (error.status === 400) {
          mensagemErro += ' Requisição inválida.';
        }
        
        this.notification.error(mensagemErro);
      }
    });
  }
}