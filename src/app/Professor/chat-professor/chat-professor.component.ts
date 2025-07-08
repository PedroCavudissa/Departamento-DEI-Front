import { Component } from '@angular/core';
import { LateralProfessorComponent } from "../lateral-professor/lateral-professor.component";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-professor',
  imports: [LateralProfessorComponent,CommonModule,FormsModule],
  templateUrl: './chat-professor.component.html',
  styleUrl: './chat-professor.component.css'
})
export class ChatProfessorComponent {
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
