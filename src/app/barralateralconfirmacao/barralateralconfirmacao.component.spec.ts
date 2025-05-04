import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarralateralconfirmacaoComponent } from './barralateralconfirmacao.component';

describe('BarralateralconfirmacaoComponent', () => {
  let component: BarralateralconfirmacaoComponent;
  let fixture: ComponentFixture<BarralateralconfirmacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarralateralconfirmacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarralateralconfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
