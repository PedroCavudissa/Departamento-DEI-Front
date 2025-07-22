import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoEstudanteComponent } from './comunicado-estudante.component';

describe('ComunicadoEstudanteComponent', () => {
  let component: ComunicadoEstudanteComponent;
  let fixture: ComponentFixture<ComunicadoEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicadoEstudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicadoEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
