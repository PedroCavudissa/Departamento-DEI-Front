import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioProfessorComponent } from './horario-professor.component';

describe('HorarioProfessorComponent', () => {
  let component: HorarioProfessorComponent;
  let fixture: ComponentFixture<HorarioProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
