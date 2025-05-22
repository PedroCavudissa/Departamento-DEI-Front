import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadoProfessorComponent } from './dado-professor.component';

describe('DadoProfessorComponent', () => {
  let component: DadoProfessorComponent;
  let fixture: ComponentFixture<DadoProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadoProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadoProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
