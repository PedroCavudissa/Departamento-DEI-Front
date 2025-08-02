import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNotasFilterComponent } from './tela-notas-filter.component';

describe('TelaNotasFilterComponent', () => {
  let component: TelaNotasFilterComponent;
  let fixture: ComponentFixture<TelaNotasFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaNotasFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaNotasFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
