import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnolectivoComponent } from './anolectivo.component';

describe('AnolectivoComponent', () => {
  let component: AnolectivoComponent;
  let fixture: ComponentFixture<AnolectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnolectivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnolectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
