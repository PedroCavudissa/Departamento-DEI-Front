import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private isBrowser: boolean;
  private notificationQueue: { type: string; message: string; id: number }[] = [];
  private nextId = 0;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  success(message: string): void {
    this.showNotification('success', message);
  }

  error(message: string): void {
    this.showNotification('error', message);
  }

  private showNotification(type: 'success' | 'error', message: string): void {
    if (!this.isBrowser) return;

    const id = this.nextId++;
    this.notificationQueue.push({ type, message, id });
    this.renderNotifications();
  }

  private renderNotifications(): void {
    const container = document.getElementById('custom-notifications-container');
    if (container) container.remove();

    const newContainer = document.createElement('div');
    newContainer.id = 'custom-notifications-container';
    newContainer.style.position = 'fixed';
    newContainer.style.top = '20px';
    newContainer.style.right = '20px';
    newContainer.style.zIndex = '10000';
    newContainer.style.display = 'flex';
    newContainer.style.flexDirection = 'column';
    newContainer.style.gap = '10px';

    this.notificationQueue.forEach(notification => {
      const element = this.createNotificationElement(
        notification.type,
        notification.message,
        notification.id
      );
      newContainer.appendChild(element);
    });

    document.body.appendChild(newContainer);
  }

  private createNotificationElement(type: string, message: string, id: number): HTMLElement {
    const element = document.createElement('div');
    element.className = `custom-notification ${type}`;
    element.dataset['id'] = id.toString();

    // Estilos visuais
    Object.assign(element.style, {
      padding: '15px 25px',
      borderRadius: '5px',
      color: 'white',
      maxWidth: '300px',
      position: 'relative',
      opacity: '0',
      transform: 'translateX(100%)',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
    });

    element.textContent = message;

    // Botão de fechar
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    Object.assign(closeBtn.style, {
      background: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      position: 'absolute',
      top: '5px',
      right: '10px',
      cursor: 'pointer',
    });
    closeBtn.onclick = () => this.dismissNotification(id);
    element.appendChild(closeBtn);

    // Animação de entrada
    setTimeout(() => {
      (element as HTMLElement).style.opacity = '1';
      (element as HTMLElement).style.transform = 'translateX(0)';
    }, 10);

    // Auto-destruição após 5 segundos
    setTimeout(() => {
      this.dismissNotification(id);
    }, 5000);

    return element;
  }

  private dismissNotification(id: number): void {
    const notification = document.querySelector(`.custom-notification[data-id="${id}"]`) as HTMLElement;
    if (notification) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';

      setTimeout(() => {
        this.notificationQueue = this.notificationQueue.filter(n => n.id !== id);
        this.renderNotifications();
      }, 300);
    }
  }
}
