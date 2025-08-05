import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSecretariaComponent } from './perfil-secretaria.component';

describe('PerfilSecretariaComponent', () => {
  let component: PerfilSecretariaComponent;
  let fixture: ComponentFixture<PerfilSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
