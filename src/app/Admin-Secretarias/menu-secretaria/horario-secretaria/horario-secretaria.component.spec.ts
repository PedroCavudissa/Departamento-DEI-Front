import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioSecretariaComponent } from './horario-secretaria.component';

describe('HorarioSecretariaComponent', () => {
  let component: HorarioSecretariaComponent;
  let fixture: ComponentFixture<HorarioSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
