import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioEstudanteComponent } from './horario-estudante.component';

describe('HorarioEstudanteComponent', () => {
  let component: HorarioEstudanteComponent;
  let fixture: ComponentFixture<HorarioEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioEstudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
