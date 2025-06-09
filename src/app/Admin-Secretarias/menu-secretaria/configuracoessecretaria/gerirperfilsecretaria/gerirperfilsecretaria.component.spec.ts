import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirperfilsecretariaComponent } from './gerirperfilsecretaria.component';

describe('GerirperfilsecretariaComponent', () => {
  let component: GerirperfilsecretariaComponent;
  let fixture: ComponentFixture<GerirperfilsecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerirperfilsecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerirperfilsecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
