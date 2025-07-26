import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


@Component({
  selector: 'app-confirmacoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirmacoes.component.html',
  styleUrls: ['./confirmacoes.component.css']
})
export class ConfirmacoesComponent implements OnInit {
  notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' }
  });
  /*pendentes: Confirmacao[] = [];*/
  carregando = false;
  erro = '';

  constructor() {}

  ngOnInit(): void {
   /* this.carregarPendentes();*/
    console.log('ngOnInit chamado!');
  }

 /* carregarPendentes(): void {
    this.carregando = true;
    this.confirmacaoService.getConfirmacoesPendentes().subscribe({
      next: (res) => {
        console.log('Confirmacoes recebidas:', res);
        this.pendentes = res.filter((c: Confirmacao) => c.estado === 'NÃO_PAGO');
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao buscar confirmações.';
        this.carregando = false;
      }
    });
  }*/

  /*confirmar(confirmacao: Confirmacao): void {
    const confirmarAcao = confirm('Tem certeza que deseja alterar o Estado de Pagamento?');
    if (!confirmarAcao) return;
    
    const atualizada: Confirmacao = { ...confirmacao, estado: 'PAGO' };

    this.confirmacaoService.atualizarEstado(confirmacao.id, atualizada).subscribe({
      next: () => {
        this.pendentes = this.pendentes.filter((c: Confirmacao) => c.id !== confirmacao.id);
        this.notyf.success('Pagamento confirmado com sucesso!');
      },
      error: () => {
        this.notyf.error('Erro ao confirmar pagamento.');
      }
    });
  }*/
}
