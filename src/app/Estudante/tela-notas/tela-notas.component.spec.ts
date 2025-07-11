import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNotasComponent } from './tela-notas.component';

describe('TelaNotasComponent', () => {
  let component: TelaNotasComponent;
  let fixture: ComponentFixture<TelaNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaNotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
