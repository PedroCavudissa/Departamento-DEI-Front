import { Component } from '@angular/core';
import { LateralComponent } from "../lateral/lateral.component";
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-estudante',
  imports: [LateralComponent,FormsModule,CommonModule],
  templateUrl: './chat-estudante.component.html',
  styleUrl: './chat-estudante.component.css'
})
export class ChatEstudanteComponent {
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
