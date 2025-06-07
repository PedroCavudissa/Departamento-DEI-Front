import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEstudanteComponent } from './perfil-estudante.component';

describe('PerfilEstudanteComponent', () => {
  let component: PerfilEstudanteComponent;
  let fixture: ComponentFixture<PerfilEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilEstudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
