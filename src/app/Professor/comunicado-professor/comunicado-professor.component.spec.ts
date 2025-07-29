import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoProfessorComponent } from './comunicado-professor.component';

describe('ComunicadoProfessorComponent', () => {
  let component: ComunicadoProfessorComponent;
  let fixture: ComponentFixture<ComunicadoProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicadoProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicadoProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
