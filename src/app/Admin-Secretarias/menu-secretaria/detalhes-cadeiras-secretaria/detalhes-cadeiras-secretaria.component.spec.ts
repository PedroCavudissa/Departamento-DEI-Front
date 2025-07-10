import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCadeirasSecretariaComponent } from './detalhes-cadeiras-secretaria.component';

describe('DetalhesCadeirasComponent', () => {
  let component: DetalhesCadeirasSecretariaComponent;
  let fixture: ComponentFixture<DetalhesCadeirasSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesCadeirasSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesCadeirasSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
