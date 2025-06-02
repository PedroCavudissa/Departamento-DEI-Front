import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioProfessorComponent } from './calendario-professor.component';

describe('CalendarioProfessorComponent', () => {
  let component: CalendarioProfessorComponent;
  let fixture: ComponentFixture<CalendarioProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
