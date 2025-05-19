import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosSecretariaComponent } from './funcionarios-secretaria.component';

describe('FuncionariosComponent', () => {
  let component: FuncionariosSecretariaComponent;
  let fixture: ComponentFixture<FuncionariosSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
