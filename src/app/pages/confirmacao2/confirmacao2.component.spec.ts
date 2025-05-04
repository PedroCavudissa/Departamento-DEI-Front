import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirmacao2Component } from './confirmacao2.component';

describe('Confirmacao2Component', () => {
  let component: Confirmacao2Component;
  let fixture: ComponentFixture<Confirmacao2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Confirmacao2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Confirmacao2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
