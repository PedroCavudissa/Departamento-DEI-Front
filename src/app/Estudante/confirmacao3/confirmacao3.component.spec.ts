import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirmacao3Component } from './confirmacao3.component';

describe('Confirmacao3Component', () => {
  let component: Confirmacao3Component;
  let fixture: ComponentFixture<Confirmacao3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Confirmacao3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Confirmacao3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
