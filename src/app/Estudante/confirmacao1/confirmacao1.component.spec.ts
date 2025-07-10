import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirmacao1Component } from './confirmacao1.component';

describe('Confirmacao1Component', () => {
  let component: Confirmacao1Component;
  let fixture: ComponentFixture<Confirmacao1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Confirmacao1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Confirmacao1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
