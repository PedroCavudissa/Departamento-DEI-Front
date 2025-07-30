import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorEstudanteComponent } from './professor-disciplinacomponent';

describe('ProfessorEstudanteComponent', () => {
  let component: ProfessorEstudanteComponent;
  let fixture: ComponentFixture<ProfessorEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorEstudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
