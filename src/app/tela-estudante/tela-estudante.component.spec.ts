import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEstudanteComponent } from './tela-estudante.component';

describe('TelaEstudanteComponent', () => {
  let component: TelaEstudanteComponent;
  let fixture: ComponentFixture<TelaEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaEstudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
