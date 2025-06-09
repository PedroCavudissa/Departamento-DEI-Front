import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPautaSecretariaComponent } from './ver-pauta-secretaria.component';

describe('VerPautaSecretariaComponent', () => {
  let component: VerPautaSecretariaComponent;
  let fixture: ComponentFixture<VerPautaSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPautaSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPautaSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
