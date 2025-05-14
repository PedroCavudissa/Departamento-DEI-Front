import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaProfComponent } from './tela-prof.component';

describe('TelaProfComponent', () => {
  let component: TelaProfComponent;
  let fixture: ComponentFixture<TelaProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
