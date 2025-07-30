import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';
import { Confirmacao, ConfirmacaoService } from '../../../services/confirmacao.service';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-confirmacoes',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralSecretariaComponent],
  templateUrl: './confirmacoes.component.html',
  styleUrls: ['./confirmacoes.component.css']
})
export class ConfirmacoesComponent implements OnInit {
  pendentes: Confirmacao[] = [];
  carregando = false;
  erro = '';
  

  constructor(private confirmacaoService: ConfirmacaoService,private notification: NotificationService) {}

  ngOnInit(): void {
    this.carregarPendentes();
    console.log('ngOnInit chamado!');
  }

  carregarPendentes(): void {
    this.carregando = true;
    this.confirmacaoService.listarConfirmacoes().subscribe({
    
   
      next: (res) => {
     
        console.log('Confirmacoes recebidas:',res);
        this.pendentes = res.content.filter(c => c.estado === 'NÃO_PAGO');
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao buscar confirmações.';
        this.carregando = false;
      }
    });
  }


  confirmar(confirmacao: Confirmacao): void {
    const confirmarAcao = confirm('Tem certeza que deseja alterar o Estado de Pagamento?');
    if (!confirmarAcao) return;
    const atualizada: Confirmacao = { ...confirmacao, estado: 'PAGO' };
    this.confirmacaoService.atualizarStatusUsuario(confirmacao.id, atualizada).subscribe({
      next: () => {
        this.pendentes = this.pendentes.filter(c => c.id !== confirmacao.id);
        this.notification.success('Pagamento confirmado com sucesso!');
      },
      error: () => {
        this.notification.error('Erro ao confirmar pagamento.');
      }
    });
  }
}
