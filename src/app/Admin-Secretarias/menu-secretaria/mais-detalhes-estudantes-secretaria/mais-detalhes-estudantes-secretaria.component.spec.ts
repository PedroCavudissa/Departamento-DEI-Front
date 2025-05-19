import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisDetalhesEstudantesSecretariaComponent } from './mais-detalhes-estudantes-secretaria.component';

describe('MaisDetalhesEstudantesComponent', () => {
  let component: MaisDetalhesEstudantesSecretariaComponent;
  let fixture: ComponentFixture<MaisDetalhesEstudantesSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaisDetalhesEstudantesSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaisDetalhesEstudantesSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
