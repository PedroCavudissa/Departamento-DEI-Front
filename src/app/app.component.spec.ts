import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Importando o RouterTestingModule
import { TelaFuncionarioComponent } from './TelaFuncionario/TelaFuncionario.component';

describe('TelaFuncionarioComponent', () => {
  let component: TelaFuncionarioComponent;
  let fixture: ComponentFixture<TelaFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TelaFuncionarioComponent, // Importando o componente standalone
        RouterTestingModule // Importando o RouterTestingModule para testar roteamento
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TelaFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Teste de criação do componente
  });
});
