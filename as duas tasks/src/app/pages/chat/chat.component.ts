import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BarralateralComponent } from '../../barralateral/barralateral.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, BarralateralComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  recipient: string = '';
  subject: string = '';
  description: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.recipient = params['destinatario'] || '';
      this.subject = params['assunto'] || '';
    });
  }

  sendMessage() {
    if (this.description.trim()) {
      console.log('Mensagem enviada:', {
        recipient: this.recipient,
        subject: this.subject,
        description: this.description
      });
      this.description = '';
    }
  }
}
