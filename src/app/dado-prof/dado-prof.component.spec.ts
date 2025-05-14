import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadoProfComponent } from './dado-prof.component';

describe('DadoProfComponent', () => {
  let component: DadoProfComponent;
  let fixture: ComponentFixture<DadoProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadoProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadoProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
