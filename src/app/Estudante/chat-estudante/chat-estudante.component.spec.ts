import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEstudanteComponent } from './chat-estudante.component';

describe('ChatEstudanteComponent', () => {
  let component: ChatEstudanteComponent;
  let fixture: ComponentFixture<ChatEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatEstudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
