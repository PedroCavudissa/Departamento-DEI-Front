import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarralateralComponent } from '../../barralateral/barralateral.component';
imports: [CommonModule, FormsModule, BarralateralComponent]


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: { from: string, text: string }[] = [
    { from: 'funcionario', text: 'Olá, como posso ajudar?' },
    { from: 'estudante', text: 'Gostaria de saber sobre a inscrição.' }
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ from: 'estudante', text: this.newMessage });
      this.newMessage = '';
      setTimeout(() => {
        this.messages.push({ from: 'funcionario', text: 'Certo! Já verifico para você.' });
      }, 1000);
    }
  }

  limparMensagens() {
    this.messages = [];
  }
}

