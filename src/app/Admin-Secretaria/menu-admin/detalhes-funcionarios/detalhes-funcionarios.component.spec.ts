import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesFuncionariosComponent } from './detalhes-funcionarios.component';

describe('DetalhesFuncionariosComponent', () => {
  let component: DetalhesFuncionariosComponent;
  let fixture: ComponentFixture<DetalhesFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesFuncionariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
