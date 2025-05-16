import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesEstudantesSecretariaComponent } from './detalhes-estudantes-secretaria.component';

describe('DetalhesEstudantesComponent', () => {
  let component: DetalhesEstudantesSecretariaComponent;
  let fixture: ComponentFixture<DetalhesEstudantesSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesEstudantesSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesEstudantesSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
