import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesEstudantesComponent } from './detalhes-estudantes.component';

describe('DetalhesEstudantesComponent', () => {
  let component: DetalhesEstudantesComponent;
  let fixture: ComponentFixture<DetalhesEstudantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesEstudantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
