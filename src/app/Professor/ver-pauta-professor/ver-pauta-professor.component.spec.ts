import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPautaProfessorComponent } from './ver-pauta-professor.component';

describe('VerPautaProfessorComponent', () => {
  let component: VerPautaProfessorComponent;
  let fixture: ComponentFixture<VerPautaProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPautaProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPautaProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
