import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BarralateralSecretariaComponent } from '../../barralateral-secretaria/barralateral-secretaria.component';

@Component({
  selector: 'app-chat-secretaria',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralSecretariaComponent],
  templateUrl: './chat-secretaria.component.html',
  styleUrls: ['./chat-secretaria.component.css'],
})
export class ChatSecretariaComponent implements OnInit {
  recipient = '';
  subject = '';
  description = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.recipient = params['destinatario'] || '';
      this.subject = params['assunto'] || '';
    });
  }

  sendMessage() {
    if (this.description.trim()) {
      console.log('Mensagem enviada:', {
        recipient: this.recipient,
        subject: this.subject,
        description: this.description,
      });
      this.description = '';
    }
  }
}
