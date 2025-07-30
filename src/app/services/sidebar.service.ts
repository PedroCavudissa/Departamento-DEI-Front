import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private isOpen = true;

  setOpen(state: boolean) {
    this.isOpen = state;
  }

  getOpen(): boolean {
    return this.isOpen;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

