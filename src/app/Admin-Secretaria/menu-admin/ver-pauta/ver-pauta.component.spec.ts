import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPautaComponent } from './ver-pauta.component';

describe('VerPautaComponent', () => {
  let component: VerPautaComponent;
  let fixture: ComponentFixture<VerPautaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPautaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
