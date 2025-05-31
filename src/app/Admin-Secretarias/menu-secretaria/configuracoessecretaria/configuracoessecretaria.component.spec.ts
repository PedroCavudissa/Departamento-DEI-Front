import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoessecretariaComponent } from './configuracoessecretaria.component';

describe('ConfiguracoessecretariaComponent', () => {
  let component: ConfiguracoessecretariaComponent;
  let fixture: ComponentFixture<ConfiguracoessecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracoessecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracoessecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
