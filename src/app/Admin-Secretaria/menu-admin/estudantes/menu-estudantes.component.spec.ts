import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEstudantesComponent } from './menu-estudantes.component';

describe('FuncionariosComponent', () => {
  let component: MenuEstudantesComponent;
  let fixture: ComponentFixture<MenuEstudantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEstudantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
