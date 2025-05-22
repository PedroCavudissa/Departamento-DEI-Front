import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesFuncionariosSecretariaComponent } from './detalhes-funcionarios-secretaria.component';

describe('DetalhesFuncionariosComponent', () => {
  let component: DetalhesFuncionariosSecretariaComponent;
  let fixture: ComponentFixture<DetalhesFuncionariosSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesFuncionariosSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesFuncionariosSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
