import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEstudantesSecretariaComponent } from './menu-estudantes-secretaria.component';

describe('FuncionariosComponent', () => {
  let component: MenuEstudantesSecretariaComponent;
  let fixture: ComponentFixture<MenuEstudantesSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEstudantesSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuEstudantesSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
