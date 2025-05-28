import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaisDetalhesEstudantesComponent } from './mais-detalhes-estudantes.component';

describe('MaisDetalhesEstudantesComponent', () => {
  let component: MaisDetalhesEstudantesComponent;
  let fixture: ComponentFixture<MaisDetalhesEstudantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaisDetalhesEstudantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaisDetalhesEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
