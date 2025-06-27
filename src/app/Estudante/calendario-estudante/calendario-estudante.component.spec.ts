import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioEstudanteComponent } from './calendario-estudante.component';

describe('CalendarioEstudanteComponent', () => {
  let component: CalendarioEstudanteComponent;
  let fixture: ComponentFixture<CalendarioEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioEstudanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
