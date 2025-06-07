import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilprofeComponent } from './perfilprofe.component';

describe('PerfilprofeComponent', () => {
  let component: PerfilprofeComponent;
  let fixture: ComponentFixture<PerfilprofeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilprofeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilprofeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
