import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Importa o CSS do Notyf

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notyf: Notyf;

  constructor() {
    this.notyf = new Notyf({
      duration: 4000,
      position: {
        x: 'right',
        y: 'top',
      },
      types: [
        {
          type: 'error',
          background: '#e74c3c',
          icon: false
        },
        {
          type: 'success',
          background: '#2ecc71',
          icon: false
        }
      ]
    });
  }

  success(mensagem: string) {
    this.notyf.success(mensagem);
  }

  error(mensagem: string) {
    this.notyf.error(mensagem);
  }
}
