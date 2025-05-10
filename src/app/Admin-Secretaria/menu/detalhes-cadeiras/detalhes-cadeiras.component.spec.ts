import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCadeirasComponent } from './detalhes-cadeiras.component';

describe('DetalhesCadeirasComponent', () => {
  let component: DetalhesCadeirasComponent;
  let fixture: ComponentFixture<DetalhesCadeirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesCadeirasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesCadeirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
